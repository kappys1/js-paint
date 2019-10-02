import Component from './components/Component'
import Paint from './components/Paint'
import './App.scss'

/**
 * App Component
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  /**
   * Creates an instance of App
   *
   * @memberof App
   */
  constructor() {
    super('main')

    this.element.classList.add('App')

    const windowWidth = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    )
    const windowHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    )

    const paint = new Paint({
      width: windowWidth * 0.6,
      height: windowHeight * 0.8
    })
    this.element.appendChild(paint.element)
  }
}

export default App
