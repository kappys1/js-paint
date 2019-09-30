import Component from '../Component'
import Canvas from '../Canvas'
import Button from '../Button'
import Stroke from '../../entities/Stroke'
import StoreStroke from '../../entities/Store'
import './Paint.scss'

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
   * @param {Array<string>} props.colors - The palette of colors to colors tool
   * @param {Array<number>} props.lineWidths - The line widths to line widths tool
   * @param {string} [props.defaultColor] - The default stroke color
   * @param {number} [props.defaultLineWidth] - The default line width
   * @throws {Error} - Incorrect type
   * @memberof Paint
   */
  constructor({width, height, colors, lineWidths, defaultColor, defaultLineWidth}) {
    super('section')

    if (typeof width === 'undefined') throw new Error('width is required')
    if (typeof height === 'undefined') throw new Error('height is required')
    if (typeof colors === 'undefined') throw new Error('colors is required')
    if (typeof lineWidths === 'undefined') throw new Error('lineWidths is required')

    if (typeof width !== 'number') throw new Error('width must be of type number')
    if (typeof height !== 'number') throw new Error('height must be of type number')
    if (!Array.isArray(colors)) throw new Error('colors must be of type Array')
    if (!Array.isArray(lineWidths)) throw new Error('lineWidths must be of type Array')
    if (defaultColor && typeof defaultColor !== 'string') throw new Error('defaultColor must be of type string')
    if (defaultLineWidth && typeof defaultLineWidth !== 'number')
      throw new Error('defaultLineWidth must be of type number')

    this.element.classList.add('Paint')

    this.width = width
    this.height = height
    this.colors = colors
    this.lineWidths = lineWidths
    this.defaultColor = defaultColor || '#000000'
    this.defaultLineWidth = defaultLineWidth || 1

    this.strokes = new StoreStroke()
    this.currentStroke = {}

    const canvasWrapper = document.createElement('section')
    canvasWrapper.classList.add('Paint-canvasWrapper')

    this.canvas = new Canvas({
      width: this.width,
      height: this.height,
      defaultColor: this.defaultColor,
      onMouseDown: this.onCanvasMouseDown,
      onMouseMove: this.onCanvasMouseMove,
      onMouseUp: this.onCanvasMouseUp
    })
    canvasWrapper.appendChild(this.canvas.element)

    this.element.appendChild(canvasWrapper)

    if (this.canvas) {
      const toolsWrapper = document.createElement('section')
      toolsWrapper.classList.add('Paint-toolsWrapper')

      //   // undo button
      const undoContent = document.createElement('div')
      undoContent.innerText = 'back'
      this.undoButton = new Button({
        children: [undoContent],
        isEnable: false,
        onClick: this.onUndoClick
      })

      //   // redo button
      const redoContent = document.createElement('div')
      redoContent.innerText = 'next'
      this.redoButton = new Button({
        children: [redoContent],
        isEnable: false,
        onClick: this.onRedoClick
      })
      toolsWrapper.appendChild(this.undoButton.element)
      toolsWrapper.appendChild(this.redoButton.element)

      this.element.appendChild(toolsWrapper)
    }
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

    this.undoButton.enable()
    this.redoButton.disable()
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

      if (this.strokes.position === -1) this.undoButton.disable()

      this.redoButton.enable()
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

      if (this.strokes.isPositionAtLeast) this.redoButton.disable()

      this.undoButton.enable()

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
