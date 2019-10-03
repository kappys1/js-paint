import Paint from '.'
import 'jest-canvas-mock'
import Stroke from '../../entities/Stroke'

describe('paint', () => {
  let width
  let height
  let colors
  let lineWidths
  let defaultColor
  let defaultLineWidth

  beforeEach(() => {
    width = 900
    height = 600
    defaultColor = '#000000'
  })

  describe('entry', () => {
    test('should create correctly with required parameters', () => {
      expect(new Paint({width, height})).toBeDefined()
    })

    test('should fail on trying to pass a undefined in property width', () => {
      expect(() => {
        new Paint({height})
      }).toThrowError('width is required')
    })

    test('should fail on trying to pass a undefined in property height', () => {
      expect(() => {
        new Paint({width})
      }).toThrowError('height is required')
    })

    test('should fail on trying to pass incorrect type in property width', () => {
      width = '900'

      expect(() => {
        new Paint({width, height})
      }).toThrowError('width must be of type number')
    })

    test('should fail on trying to pass incorrect type in property height', () => {
      height = '500'

      expect(() => {
        new Paint({width, height})
      }).toThrowError('height must be of type number')
    })
  })

  describe('initial', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({width, height})
    })

    test('should be an instance of Paint', () => {
      expect(paint).toBeInstanceOf(Paint)
    })

    test('should the element be of type HTMLElement', () => {
      expect(paint.element).toBeDefined()
      expect(paint.element).toBeInstanceOf(HTMLElement)
    })

    test('should the element contain the class name Paint', () => {
      expect(paint.element.classList.contains('Paint')).toBeTruthy()
    })

    test('should have the same width', () => {
      expect(paint.width).toBe(width)
    })

    test('should have the same height', () => {
      expect(paint.height).toBe(height)
    })
  })

  describe('on canvas mouse down', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({width, height})
    })

    test('should handle the on mouse down correctly', () => {
      const {canvas} = paint

      canvas.element.dispatchEvent(new Event('mousedown'))

      expect(paint.currentStroke).toBeDefined()
      expect(paint.currentStroke).toBeInstanceOf(Stroke)
      expect(paint.currentStroke.coordinates).toHaveLength(1)
    })
  })

  const createPointerEvent = (type, x, y, touches) => {
    const event = document.createEvent('Event')
    event.initEvent(type, true, true)
    event.touches = []
    if (touches) {
      event.touches.push({clientX: x, clientY: y})
    } else {
      event.changedTouches = [{clientX: x, clientY: y}]
    }

    return event
  }

  describe('on canvas touch start', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({width, height})
    })

    test('should handle the on touch start correctly', () => {
      const {canvas} = paint

      canvas.element.dispatchEvent(createPointerEvent('touchstart', 0, 0, true))

      expect(paint.currentStroke).toBeDefined()
      expect(paint.currentStroke).toBeInstanceOf(Stroke)
      expect(paint.currentStroke.coordinates).toHaveLength(1)
    })
  })

  describe('on canvas mouse move', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({width, height})
    })

    test('should handle the on mouse move correctly', () => {
      const {canvas} = paint

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))

      expect(paint.currentStroke).toBeDefined()
      expect(paint.currentStroke).toBeInstanceOf(Stroke)
      expect(paint.currentStroke.coordinates).toHaveLength(2)
    })
  })

  describe('on canvas touch move', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({width, height})
    })

    test('should handle the on touch move correctly', () => {
      const {canvas} = paint

      canvas.element.dispatchEvent(createPointerEvent('touchstart', 0, 0, true))
      canvas.element.dispatchEvent(createPointerEvent('touchmove', 10, 10, true))
      expect(paint.currentStroke).toBeDefined()
      expect(paint.currentStroke).toBeInstanceOf(Stroke)
      expect(paint.currentStroke.coordinates).toHaveLength(2)
    })

    test('should handle the on touch move badly, because not paiting', () => {
      const {canvas} = paint
      canvas.element.dispatchEvent(createPointerEvent('touchmove', 10, 10, true))
      expect(canvas.painting).toBeFalsy()
    })
  })

  describe('on canvas touch up', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({width, height})
    })

    test('should handle the on touch move correctly', () => {
      const {canvas, header} = paint
      const {undoButton} = header
      const {redoButton} = header

      canvas.element.dispatchEvent(createPointerEvent('touchstart', 0, 0, true))
      canvas.element.dispatchEvent(createPointerEvent('touchmove', 10, 10, true))
      canvas.element.dispatchEvent(createPointerEvent('touchend', 200, 200, false))

      expect(paint.strokes.store).toHaveLength(1)
      expect(paint.strokes.position).toBe(0)
      expect(paint.currentStroke).toEqual({})

      canvas.element.dispatchEvent(createPointerEvent('touchstart', 0, 0, true))
      canvas.element.dispatchEvent(createPointerEvent('touchmove', 10, 10, true))
      canvas.element.dispatchEvent(createPointerEvent('touchend', 200, 200, true))

      expect(paint.strokes.store).toHaveLength(2)
      expect(paint.strokes.position).toBe(1)
      expect(paint.currentStroke).toEqual({})

      expect(undoButton.isEnable).toBeTruthy()
      expect(undoButton.element.disabled).toBeFalsy()

      expect(redoButton.isEnable).toBeFalsy()
      expect(redoButton.element.disabled).toBeTruthy()
    })
  })

  describe('on canvas mouse up', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({width, height})
    })

    test('should handle the on mouse move correctly', () => {
      const {canvas, header, strokes} = paint
      const {undoButton} = header
      const {redoButton} = header
      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      expect(strokes.store).toHaveLength(1)
      expect(strokes.position).toBe(0)
      expect(paint.currentStroke).toEqual({})

      expect(undoButton.isEnable).toBeTruthy()
      expect(undoButton.element.disabled).toBeFalsy()

      expect(redoButton.isEnable).toBeFalsy()
      expect(redoButton.element.disabled).toBeTruthy()
    })

    test('should handle the on mouse move correctly when stroke is a pixel', () => {
      const {canvas, header} = paint
      const {undoButton} = header
      const {redoButton} = header

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      expect(paint.strokes.store).toHaveLength(1)
      expect(paint.strokes.position).toBe(0)
      expect(paint.currentStroke).toEqual({})

      expect(undoButton.isEnable).toBeTruthy()
      expect(undoButton.element.disabled).toBeFalsy()

      expect(redoButton.isEnable).toBeFalsy()
      expect(redoButton.element.disabled).toBeTruthy()
    })

    test('should handle the on mouse move correctly when stroke is after of an undo action', () => {
      const {canvas, header} = paint
      const {undoButton} = header
      const {redoButton} = header

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      undoButton.element.dispatchEvent(new Event('click'))

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      expect(paint.strokes.store).toHaveLength(1)
      expect(paint.strokes.position).toBe(0)
      expect(paint.currentStroke).toEqual({})

      expect(undoButton.isEnable).toBeTruthy()
      expect(undoButton.element.disabled).toBeFalsy()

      expect(redoButton.isEnable).toBeFalsy()
      expect(redoButton.element.disabled).toBeTruthy()
    })
  })

  // TODO: test it with node canvas
  // describe('on color click', () => {})

  // TODO: test it with node canvas
  // describe('on line width click', () => {})

  describe('on undo click', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({width, height})
    })

    test('should not perform undo when there is no stroke', () => {
      const {header} = paint
      const {undoButton} = header
      const {redoButton} = header

      expect(paint.strokes.position).toBe(-1)

      expect(undoButton.isEnable).toBeFalsy()
      expect(undoButton.element.disabled).toBeTruthy()

      expect(redoButton.isEnable).toBeFalsy()
      expect(redoButton.element.disabled).toBeTruthy()
    })

    test('should undo correctly after a stroke', () => {
      const {canvas, header} = paint
      const {undoButton} = header
      const {redoButton} = header

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      undoButton.element.dispatchEvent(new Event('click'))

      expect(paint.strokes.position).toBe(-1)

      expect(undoButton.isEnable).toBeFalsy()
      expect(undoButton.element.disabled).toBeTruthy()

      expect(redoButton.isEnable).toBeTruthy()
      expect(redoButton.element.disabled).toBeFalsy()
    })

    test('should undo correctly after of many stroke', () => {
      const {canvas, header} = paint
      const {undoButton} = header

      for (let i = 0; i < 5; i++) {
        canvas.element.dispatchEvent(new Event('mousedown'))
        canvas.element.dispatchEvent(new Event('mousemove'))
        canvas.element.dispatchEvent(new Event('mouseup'))
      }

      undoButton.element.dispatchEvent(new Event('click'))
      expect(paint.strokes.position).toBe(3)

      undoButton.element.dispatchEvent(new Event('click'))
      expect(paint.strokes.position).toBe(2)

      undoButton.element.dispatchEvent(new Event('click'))
      expect(paint.strokes.position).toBe(1)

      undoButton.element.dispatchEvent(new Event('click'))
      expect(paint.strokes.position).toBe(0)
    })
  })

  describe('on redo click', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({width, height})
    })

    test('should not perform redo when there is no stroke', () => {
      const {header} = paint
      const {undoButton} = header
      const {redoButton} = header

      expect(paint.strokes.position).toBe(-1)

      expect(undoButton.isEnable).toBeFalsy()
      expect(undoButton.element.disabled).toBeTruthy()

      expect(redoButton.isEnable).toBeFalsy()
      expect(redoButton.element.disabled).toBeTruthy()
    })

    test('should not perform redo when there is no undo action', () => {
      const {canvas, header} = paint
      const {undoButton} = header
      const {redoButton} = header

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      expect(paint.strokes.position).toBe(0)

      expect(undoButton.isEnable).toBeTruthy()
      expect(undoButton.element.disabled).toBeFalsy()

      expect(redoButton.isEnable).toBeFalsy()
      expect(redoButton.element.disabled).toBeTruthy()
    })

    test('should redo correctly after an undo action', () => {
      const {canvas, header} = paint
      const {undoButton} = header
      const {redoButton} = header

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      undoButton.element.dispatchEvent(new Event('click'))
      redoButton.element.dispatchEvent(new Event('click'))

      expect(paint.strokes.position).toBe(0)

      expect(undoButton.isEnable).toBeTruthy()
      expect(undoButton.element.disabled).toBeFalsy()

      expect(redoButton.isEnable).toBeFalsy()
      expect(redoButton.element.disabled).toBeTruthy()
    })
  })

  describe('is stroke a pixel', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({width, height})
    })

    test('should correctly return that the stroke is a pixel', () => {
      const {canvas} = paint

      canvas.element.dispatchEvent(new Event('mousedown'))

      expect(paint.isStrokeAPixel(paint.currentStroke)).toBeTruthy()
    })
  })

  describe('is new stroke after undo', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({width, height})
    })

    test('should correctly return that a stroke has been made after of an undo action', () => {
      const {canvas, header} = paint
      const {undoButton} = header

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      undoButton.element.dispatchEvent(new Event('click'))

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))

      expect(!paint.strokes.isPositionAtLeast()).toBeTruthy()
    })

    test('should has activate redoButton after undo action', () => {
      const {canvas, header} = paint
      const {undoButton, redoButton} = header

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      canvas.element.dispatchEvent(new Event('mousedown'))
      canvas.element.dispatchEvent(new Event('mousemove'))
      canvas.element.dispatchEvent(new Event('mouseup'))

      undoButton.element.dispatchEvent(new Event('click'))
      undoButton.element.dispatchEvent(new Event('click'))
      redoButton.element.dispatchEvent(new Event('click'))

      expect(!paint.strokes.isPositionAtLeast()).toBeTruthy()
      expect(redoButton.isEnable).toBeTruthy()
    })

    test('do nothing  before undo and redo click', () => {
      const {header} = paint
      const {undoButton, redoButton} = header

      redoButton.element.dispatchEvent(new Event('click'))
      undoButton.element.dispatchEvent(new Event('click'))

      expect(paint.strokes.store.length).toBe(0)
    })
  })

  describe('change color of stroke', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({width, height})
    })
    test('should correctly change color stroke', () => {
      const color = '#fff'
      paint.onColorClick(color)
      const context = paint.canvas.element.getContext('2d')
      expect(context.strokeStyle).toBe(color)
    })

    test('should correctly change color stroke by events', () => {
      const color = '#fff'
      paint.sideBar.colorsSection.handleColorClick(color)
      const context = paint.canvas.element.getContext('2d')
      expect(context.strokeStyle).toBe(color)
    })
  })

  describe('change lineWitdth of stroke', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({width, height})
    })
    test('should correctly change width stroke', () => {
      const lineWidth = 2
      paint.onLineWidthClick(lineWidth)
      const context = paint.canvas.element.getContext('2d')
      expect(context.lineWidth).toBe(lineWidth)
    })

    test('should correctly change lineWidth stroke by events', () => {
      const lineWidth = 2
      paint.sideBar.lineWidthsSection.handleLineWidthClick(lineWidth)
      const context = paint.canvas.element.getContext('2d')
      expect(context.lineWidth).toBe(lineWidth)
    })
  })

  describe('Save images', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({width, height})
    })
    test('save image works', () => {
      const elm = paint.onSaveClick()
      expect(elm).not.toBeNull()
    })
  })

  describe('Open SideBar', () => {
    let paint

    beforeEach(() => {
      paint = new Paint({width, height})
    })

    test('open Sidebar', () => {
      const menu = paint.header.element.getElementsByClassName('Header__menu')[0]
      expect(menu).not.toBeNull()
      menu.click()
      expect(paint.sideBar.element.classList.contains('SideBar--open')).toBeTruthy()
    })
  })
})
