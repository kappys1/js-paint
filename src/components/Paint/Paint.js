import Component from '../Component'
import Canvas from '../Canvas'
import Stroke from '../../entities/Stroke'
import StoreStroke from '../../entities/Store'
import Config from '../../config'
import Section from '../Section'
import Header from '../Header'

import './Paint.scss'
import SideBar from '../SideBar'

/**
 * Paint Component
 *
 * @class Paint
 * @extends {Component}
 */
class Paint extends Component {
  /**
   * Creates an instance of Paint
   *
   * @param {Object} props - The props of the component
   * @param {number} props.width - The width to canvas element
   * @param {number} props.height - The height to canvas element
   * @throws {Error} - Incorrect type
   * @memberof Paint
   */
  constructor({width, height}) {
    super('section')

    if (typeof width === 'undefined') throw new Error('width is required')
    if (typeof height === 'undefined') throw new Error('height is required')

    this.element.classList.add('Paint')

    this.width = width
    this.height = height
    this.defaultColor = Config.defaultColor || '#000000'

    this.strokes = new StoreStroke()
    this.currentStroke = {}

    const bodySection = document.createElement('section')
    bodySection.classList.add('Paint__body')

    this.canvas = new Canvas({
      width: this.width,
      height: this.height,
      defaultColor: this.defaultColor,
      onMouseDown: this.onCanvasMouseDown,
      onMouseMove: this.onCanvasMouseMove,
      onMouseUp: this.onCanvasMouseUp,
      onTouchStart: this.onCanvasMouseDown,
      onTouchMove: this.onCanvasMouseMove,
      onTouchEnd: this.onCanvasMouseUp
    })
    const canvasContainer = new Section({children: [this.canvas.element]})
    canvasContainer.element.classList.add('Paint__canvas')

    this.header = new Header({
      onUndoClick: this.onUndoClick,
      onRedoClick: this.onRedoClick,
      onSaveClick: this.onSaveClick,
      onOpenSidebarClick: this.onOpenSidebarClick
    })
    this.header.element.classList.add('Paint__header')

    this.sideBar = new SideBar({
      onColorClick: this.onColorClick,
      onLineWidthClick: this.onLineWidthClick
    })
    this.sideBar.element.classList.add('Paint__sidebar')

    bodySection.appendChild(canvasContainer.element)
    bodySection.appendChild(this.sideBar.element)
    this.element.appendChild(this.header.element)
    this.element.appendChild(bodySection)
  }

  /**
   * Handler of the canvas mouse down
   *
   * @param {CanvasRenderingContext2D} context -  The canvas context
   * @param {number} coordinateX -  The mouse coordinate X
   * @param {number} coordinateY -  The mouse coordinate Y
   */
  onCanvasMouseDown = (context, coordinateX, coordinateY) => {
    context.beginPath()
    context.moveTo(coordinateX, coordinateY)
    this.currentStroke = new Stroke(context.strokeStyle, context.lineWidth, coordinateX, coordinateY)
  }

  /**
   ** Handler of the canvas mouse move
   *
   * @param {CanvasRenderingContext2D} context -  The canvas context
   * @param {number} coordinateX -  The mouse coordinate X
   * @param {number} coordinateY -  The mouse coordinate Y
   */
  onCanvasMouseMove = (context, coordinateX, coordinateY) => {
    context.lineTo(coordinateX, coordinateY)
    context.stroke()
    this.currentStroke.addCoordinate(coordinateX, coordinateY)
  }

  /**
   * Handler of the canvas mouse up
   *
   * @param {CanvasRenderingContext2D} context -  The canvas context
   * @param {number} coordinateX -  The mouse coordinate X
   * @param {number} coordinateY -  The mouse coordinate Y
   */
  onCanvasMouseUp = (context, coordinateX, coordinateY) => {
    if (this.isStrokeAPixel(this.currentStroke)) {
      coordinateX--
      coordinateY--

      context.lineTo(coordinateX, coordinateY)
      context.stroke()

      this.currentStroke.addCoordinate(coordinateX, coordinateY)
    }

    if (!this.strokes.isPositionAtLeast()) {
      this.strokes.clearFromPosition()
    }

    this.strokes.add(this.currentStroke)
    this.currentStroke = {}

    this.header.undoButton.enable()
    this.header.redoButton.disable()
  }

  /**
   * Handler of the color click
   *
   * @param {string} code -  The color code
   */
  onColorClick = code => {
    const context = this.canvas.element.getContext('2d')
    context.strokeStyle = code
  }

  /**
   * Handler of the line width click
   *
   * @param {number} width -  The width of line
   */
  onLineWidthClick = width => {
    const context = this.canvas.element.getContext('2d')
    context.lineWidth = width
  }

  onOpenSidebarClick = () => {
    this.sideBar.element.classList.toggle('SideBar--open')
  }

  onSaveClick = () => {
    const image = this.canvas.element.toDataURL()
    const aLink = document.createElement('a')
    aLink.classList.add('download')
    aLink.download = 'image.png'
    aLink.href = image
    aLink.click()
    return aLink
  }

  /**
   * Handler of the undo click
   *
   * @param {boolean} isEnable -  The flag of enable o disable
   */

  onUndoClick = isEnable => {
    if (isEnable) {
      const context = this.canvas.element.getContext('2d')

      context.save()

      context.clearRect(0, 0, this.width, this.height)

      this.strokes.undoPosition()

      if (this.strokes.position === -1) this.header.undoButton.disable()

      this.header.redoButton.enable()
      for (let index = 0; index <= this.strokes.position; index++) {
        const stroke = this.strokes.store[index]

        context.strokeStyle = stroke.color
        context.lineWidth = stroke.width

        this.drawCoordinates(stroke.coordinates, context)
      }

      context.restore()
    }
  }

  /**
   * Handler of the redo click
   *
   * @param {boolean} isEnable -  The flag of enable o disable
   */
  onRedoClick = isEnable => {
    if (isEnable) {
      const context = this.canvas.element.getContext('2d')

      context.save()

      this.strokes.redoPosition()

      if (this.strokes.isPositionAtLeast) this.header.redoButton.disable()

      this.header.undoButton.enable()

      const stroke = this.strokes.store[this.strokes.position]

      context.strokeStyle = stroke.color
      context.lineWidth = stroke.width

      this.drawCoordinates(stroke.coordinates, context)

      context.restore()
    }
  }

  /**
   * Function that returs boolean if stroke is a pixel
   *
   * @param {object} stroke - Stroke
   * @returns {boolean} - boolean if stroke is a pixel
   */
  isStrokeAPixel(stroke) {
    return stroke.coordinates.length === 1
  }

  /**
   * Draw the coordinates given on the canvas
   *
   * @param {Array<object>} coordinates - The coordinates
   * @param {CanvasRenderingContext2D} context - The canvas context
   */
  drawCoordinates(coordinates, context) {
    coordinates.forEach((coordinate, index) => {
      if (index === 0) {
        context.beginPath()
        context.moveTo(coordinate.x, coordinate.y)
      } else {
        context.lineTo(coordinate.x, coordinate.y)
        context.stroke()
      }
    })
  }
}

export default Paint
