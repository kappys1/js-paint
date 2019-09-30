import './index.scss'
import App from './App'

const root = document.getElementById('root')
root.classList.add('has-vertical-center')

// eslint-disable-next-line no-console
console.log('aaaaaaaaa')

const app = new App()
root.appendChild(app.element)
