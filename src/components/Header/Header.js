import Component from '../Component'
import './Header.scss'
import Button from '../Button'
import Section from '../Section'

/**
 * Header Component
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
  /**
   * Creates an instance of Header
   * @param {Object} props - The props of the component
   * @param {Array<any>} props.children - The children
   * @param {mixed} [props.onUndoClick] - The function to Undo onClick event
   * @param {mixed} [props.onRedoClick] - The function to Redo onClick event
   * @param {mixed} [props.onSaveClick] - The function to Save onClick event
   * @param {mixed} [props.onOpenSidebarClick] - The function to menu onClick event
   * @throws {Error} - Incorrect type
   * @memberof Header
   */
  constructor({onUndoClick, onRedoClick, onSaveClick, onMenuClick}) {
    super('header')
    this.element.classList.add('Header')

    this.navElement = document.createElement('nav')
    this.navElement.classList.add('Header__nav')

    this.open = false

    this.onUndoClick = onUndoClick
    this.onRedoClick = onRedoClick
    this.onSaveClick = onSaveClick
    this.onMenuClick = onMenuClick

    // undo button
    const undoContent = document.createElement('i')
    // undoContent.innerText = 'Undo'
    undoContent.className = 'fa fa-chevron-circle-left'
    this.undoButton = new Button({
      children: [undoContent],
      isEnable: false,
      onClick: this.onUndoClick
    })

    // redo button
    const redoContent = document.createElement('i')
    // redoContent.innerText = 'Redo'
    redoContent.className = 'fa fa-chevron-circle-right'
    this.redoButton = new Button({
      children: [redoContent],
      isEnable: false,
      onClick: this.onRedoClick
    })

    // save button
    const saveContent = document.createElement('i')
    saveContent.className = 'fa fa-download'
    this.saveButton = new Button({
      children: [saveContent],
      isEnable: true,
      onClick: this.onSaveClick
    })

    // openSidebar button
    const openSidebar = document.createElement('i')
    openSidebar.className = 'Header__menu fa fa-bars'
    this.openSidebar = new Button({
      children: [openSidebar],
      isEnable: true,
      onClick: this.onMenuClick
    })

    const headerLeftContainer = new Section({
      children: [this.undoButton.element, this.redoButton.element]
    })
    headerLeftContainer.element.classList.add('Header__left')

    const headerRightContainer = new Section({
      children: [this.saveButton.element, this.openSidebar.element]
    })
    headerRightContainer.element.classList.add('Header__right')

    this.navElement.appendChild(headerLeftContainer.element)
    this.navElement.appendChild(headerRightContainer.element)
    this.element.appendChild(this.navElement)
  }
}

export default Header
