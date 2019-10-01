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

    const colors = [
      '#FF0000',
      '#F20260',
      '#9906A8',
      '#562393',
      '#3F49AD',
      '#45B050',
      '#009788',
      '#00BAD4',
      '#00A4F4',
      '#0F91ED',
      '#85C649',
      '#CADB40',
      '#FBEE36',
      '#FFC223',
      '#FF9711',
      '#000000',
      '#5F7C8C',
      '#9D9D9D',
      '#7A5444',
      '#FB520D'
    ]
    const paint = new Paint({
      width: windowWidth * 0.6,
      height: windowHeight * 0.8,
      colors: [...colors],
      lineWidths: [1, 2, 3, 4, 5],
      defaultColor: colors[0],
      defaultLineWidth: 1
    })
    this.element.appendChild(paint.element)
  }
}

export default App
