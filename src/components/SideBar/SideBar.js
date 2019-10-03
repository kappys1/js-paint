import Component from '../Component'
import './SideBar.scss'
import Section from '../Section'
import Config from '../../config'
import ColorsSection from '../ColorsSection'
import LineWidthsSection from '../LineWidthsSection/LineWidthsSection'

/**
 * SideBar Component
 * @class SideBar
 * @extends {Component}
 */
class SideBar extends Component {
  /**
   * Creates an instance of SideBar
   * @param {Object} props - The props of the component
   * @param {Array<any>} props.children - The children
   * @param {mixed} [props.onColorClick] - The function to color onClick event
   * @param {mixed} [props.onLineWidthClick] - The function to color onClick event
   * @throws {Error} - Incorrect type
   * @memberof SideBar
   */
  constructor({onColorClick, onLineWidthClick}) {
    super('aside')
    this.element.classList.add('SideBar')

    this.onColorClick = onColorClick
    this.onLineWidthClick = onLineWidthClick
    this.colors = Config.colors
    this.defaultColor = Config.defaultColor
    this.lineWidths = Config.lineWidths
    this.defaultLineWidth = Config.defaultLineWidth

    // colors Section
    this.colorsSection = new ColorsSection({
      codes: this.colors,
      defaultCode: this.defaultColor,
      onColorClick: this.onColorClick
    })

    // line width Section
    this.lineWidthsSection = new LineWidthsSection({
      widths: this.lineWidths,
      defaultWidth: this.defaultLineWidth,
      onLineWidthClick: this.onLineWidthClick
    })

    const colorContainer = new Section({
      children: [this.colorsSection.element],
      title: 'Colors'
    })

    const lineWitdhContainer = new Section({
      children: [this.lineWidthsSection.element],
      title: 'Line Width'
    })

    this.sideBarElm = new Section({children: [colorContainer.element, lineWitdhContainer.element]})
    this.sideBarElm.element.classList.add('Section__Sidebar')
    this.element.appendChild(this.sideBarElm.element)
  }
}

export default SideBar
