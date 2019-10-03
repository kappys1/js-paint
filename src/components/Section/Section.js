import Component from '../Component'
import './Section.scss'

/**
 * Section Component
 * @class Section
 * @extends {Component}
 */
class Section extends Component {
  /**
   * Creates an instance of Section
   * @param {Object} props - The props of the component
   * @param {Array<any>} props.children - The children
   * @throws {Error} - Incorrect type
   * @memberof Section
   */
  constructor({children, title}) {
    super('section')

    if (typeof children === 'undefined') throw new Error('children is required')

    if (!Array.isArray(children)) throw new Error('children must be of type Array')

    this.element.classList.add('Section')

    if (title) {
      const h1 = document.createElement('h1')
      h1.innerText = title
      this.element.appendChild(h1)
    }

    this.children = children

    children.forEach(child => this.element.appendChild(child))
  }
}

export default Section
