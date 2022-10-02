class Cell {
    constructor(options) {
        this.x = options.x
        this.y = options.y
        this.color = options.color
    }

    changeColor(color) {
        this.color = color
    }
}

export default Cell
