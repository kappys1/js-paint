class Stroke {
  constructor(color, width, coordinateX, coordinateY) {
    this.id = `_${Math.random()
      .toString(36)
      .substr(2, 9)}`
    this.color = color
    this.width = width
    this.coordinates = []
    this.coordinates.push({x: coordinateX, y: coordinateY})
  }

  addCoordinate(coordinateX, coordinateY) {
    this.coordinates.push({x: coordinateX, y: coordinateY})
  }
}

export default Stroke
