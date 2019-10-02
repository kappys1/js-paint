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
   * @throws {Error} - Incorrect type
   * @memberof Header
   */
  constructor({onUndoClick, onRedoClick, onSaveClick}) {
    super('header')
    this.element.classList.add('Header')

    this.navElement = document.createElement('nav')
    this.navElement.classList.add('Header__nav')

    this.onUndoClick = onUndoClick
    this.onRedoClick = onRedoClick
    this.onSaveClick = onSaveClick

    // undo button
    const undoContent = document.createElement('div')
    undoContent.innerText = 'back'
    this.undoButton = new Button({
      children: [undoContent],
      isEnable: false,
      onClick: this.onUndoClick
    })

    // redo button
    const redoContent = document.createElement('div')
    redoContent.innerText = 'next'
    this.redoButton = new Button({
      children: [redoContent],
      isEnable: false,
      onClick: this.onRedoClick
    })

    // save button
    const saveContent = document.createElement('div')
    saveContent.innerText = 'Save'
    this.saveButton = new Button({
      children: [saveContent],
      isEnable: true,
      onClick: this.onSaveClick
    })

    const headerLeftContainer = new Section({
      children: [this.undoButton.element, this.redoButton.element]
    })
    headerLeftContainer.element.classList.add('Header__left')

    const headerRightContainer = new Section({
      children: [this.saveButton.element]
    })
    headerRightContainer.element.classList.add('Header__right')

    this.navElement.appendChild(headerLeftContainer.element)
    this.navElement.appendChild(headerRightContainer.element)
    this.element.appendChild(this.navElement)
  }
}

export default Header
