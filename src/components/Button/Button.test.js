import Button from '.'

describe('action button', () => {
  let children
  let isEnable
  let onClick

  beforeEach(() => {
    const spanTexts = ['Undo', 'Redo']

    children = spanTexts.map(spanText => {
      const span = document.createElement('span')
      span.innerText = spanText
      return span
    })

    isEnable = true

    onClick = isEnable => 'clicked'
  })

  describe('entry', () => {
    test('should create correctly with required parameters', () => {
      expect(new Button({children, isEnable})).toBeDefined()
    })

    test('should create correctly with required and optional parameters', () => {
      expect(new Button({children, isEnable, onClick})).toBeDefined()
    })

    test('should fail on trying to pass a undefined in property children', () => {
      expect(() => {
        new Button({isEnable})
      }).toThrowError('children is required')
    })

    test('should fail on trying to pass a undefined in property isEnable', () => {
      expect(() => {
        new Button({children})
      }).toThrowError('isEnable is required')
    })

    test('should fail on trying to pass incorrect type in property children', () => {
      children = 'span'

      expect(() => {
        new Button({children, isEnable})
      }).toThrowError('children must be of type Array')
    })

    test('should fail on trying to pass incorrect type in property isEnable', () => {
      isEnable = 'test'

      expect(() => {
        new Button({children, isEnable})
      }).toThrowError('isEnable must be of type boolean')
    })
  })

  describe('initial', () => {
    let button
    const className = 'Example'
    beforeEach(() => {
      button = new Button({children, isEnable, onClick, className})
    })

    test('should be an instance of Button', () => {
      expect(button).toBeInstanceOf(Button)
    })

    test('should the element be of type HTMLButtonElement', () => {
      expect(button.element).toBeDefined()
      expect(button.element).toBeInstanceOf(HTMLButtonElement)
    })

    test('should the element contain the class name Button', () => {
      expect(button.element.classList.contains('Button')).toBeTruthy()
    })

    test('should have the same children', () => {
      expect(button.children.length).toBe(children.length)

      children.forEach(child => expect(button.children).toContainEqual(child))
    })

    test('should have the same isEnable', () => {
      expect(button.isEnable).toBe(isEnable)
    })

    test('should have the same onClick', () => {
      expect(button.onClick).toEqual(onClick)
    })
    test('should have the same className', () => {
      expect(button.className).toEqual(className)
      expect(button.element.classList.contains(className)).toBeTruthy()
    })
  })

  describe('handle click', () => {
    let button

    test('should handle the click correctly', () => {
      onClick = isEnable => {
        expect(isEnable).toBeDefined()
        expect(isEnable).toBeTruthy()
      }

      button = new Button({children, isEnable, onClick})
      button.element.dispatchEvent(new Event('click'))
    })
  })

  describe('enable', () => {
    let button

    beforeEach(() => {
      isEnable = false
      button = new Button({children, isEnable, onClick})
    })

    test('should enable correctly', () => {
      button.enable()

      expect(button.isEnable).toBeTruthy()
      expect(button.element.classList.contains('is-enable')).toBeTruthy()
      expect(button.element.disabled).toBeFalsy()
    })
  })

  describe('disable', () => {
    let button

    beforeEach(() => {
      isEnable = true
      button = new Button({children, isEnable, onClick})
    })

    test('should disable correctly', () => {
      button.disable()

      expect(button.isEnable).toBeFalsy()
      expect(button.element.classList.contains('is-enable')).toBeFalsy()
      expect(button.element.disabled).toBeTruthy()
    })
  })
})
