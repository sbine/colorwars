import Cell from './cell'

class Grid {
    constructor(options) {
        this.options = options
    }

    generate() {
        const colors = this.options.colors || [
            'red-500',
            'green-500',
            'blue-500',
            'purple-500',
        ]
        this.cells = []
        const width = this.options.width || 4
        const height = this.options.height || 4
        const startingColor = this.options.startingColor

        let index = 0
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let color = Math.floor(Math.random() * colors.length)
                this.cells[index] = new Cell({ x, y, color })
                index++
            }
        }

        if (startingColor != undefined) {
            this.cells[0] = new Cell({ x: 0, y: 0, color: startingColor })

            // if the x-adjacent cell is the same color, change it so nobody starts with a huge block
            if (this.cells[1].color === startingColor) {
                this.cells[1] = new Cell({ x: 0, y: 1, color: (startingColor + 1) % colors.length })
            }

            // if the y-adjacent cell is the same color, change it so nobody starts with a huge block
            if (this.cells[width].color === startingColor) {
                this.cells[width] = new Cell({ x: 0, y: 1, color: (startingColor + 1) % colors.length })
            }
        }

        this.totalTiles = index

        return this.cells
    }

    getCellAt(x, y) {
        return this.cells.find((cell) => cell.x == x && cell.y == y)
    }

    getIndexAt(x, y) {
        return this.cells.findIndex((cell) => cell.x == x && cell.y == y)
    }

    setColor(newColor) {
        // @TODO: keep track of high score; bonuses for changing many cells in any given turn
        // higher multiplier for big changes at once
        const oldColor = this.cells[0]?.color

        this.options.debug && console.log(`player changed color from ${oldColor} to ${newColor}`)

        this.tilesChanged = []
        this.newTiles = []
        if (oldColor != newColor) {
            this.changeCellColor(0, oldColor, newColor)
        }

        return this.tilesChanged.length
    }

    changeCellColor(index, oldColor, newColor) {
        let cell = this.cells[index]
        if (cell.color !== oldColor || this.tilesChanged.indexOf(index) !== -1) {
            return
        }

        this.options.debug && console.log('Setting cell at ' + cell.x + ',' + cell.y + ' to ' + newColor)

        if (cell.color === oldColor) {
            cell.color = newColor
            this.tilesChanged.push(index)
        }

        if (cell.x > 0) {
            index = this.getIndexAt(cell.x - 1, cell.y)
            let otherCell = this.cells[index]

            if (otherCell.color === oldColor) {
                this.changeCellColor(index, oldColor, newColor)
            } else if (otherCell.color === newColor) {
                this.traverseNewCell(index)
            }
        }

        if (cell.x < this.options.width - 1) {
            index = this.getIndexAt(cell.x + 1, cell.y)
            let otherCell = this.cells[index]

            if (otherCell.color === oldColor) {
                this.changeCellColor(index, oldColor, newColor)
            } else if (otherCell.color === newColor) {
                this.traverseNewCell(index)
            }
        }

        if (cell.y > 0) {
            index = this.getIndexAt(cell.x, cell.y - 1)
            let otherCell = this.cells[index]

            if (otherCell.color === oldColor) {
                this.changeCellColor(index, oldColor, newColor)
            } else if (otherCell.color === newColor) {
                this.traverseNewCell(index)
            }
        }

        if (cell.y < this.options.height - 1) {
            index = this.getIndexAt(cell.x, cell.y + 1)
            let otherCell = this.cells[index]

            if (otherCell.color === oldColor) {
                this.changeCellColor(index, oldColor, newColor)
            } else if (otherCell.color === newColor) {
                this.traverseNewCell(index)
            }
        }
    }

    traverseNewCell(index) {
        if (this.newTiles.indexOf(index) !== -1
            || this.tilesChanged.indexOf(index) !== -1) {
            return
        }

        const cell = this.cells[index]
        this.options.debug && console.log('Traversing new cell ' + cell.x + ',' + cell.y)
        this.newTiles.push(index)

        if (cell.x > 0) {
            index = this.getIndexAt(cell.x - 1, cell.y)
            let otherCell = this.cells[index]

            if (otherCell.color === cell.color) {
                this.traverseNewCell(index)
            }
        }

        if (cell.x < this.options.width - 1) {
            index = this.getIndexAt(cell.x + 1, cell.y)
            let otherCell = this.cells[index]

            if (otherCell.color === cell.color) {
                this.traverseNewCell(index)
            }
        }

        if (cell.y > 0) {
            index = this.getIndexAt(cell.x, cell.y - 1)
            let otherCell = this.cells[index]

            if (otherCell.color === cell.color) {
                this.traverseNewCell(index)
            }
        }

        if (cell.y < this.options.height - 1) {
            index = this.getIndexAt(cell.x, cell.y + 1)
            let otherCell = this.cells[index]

            if (otherCell.color === cell.color) {
                this.traverseNewCell(index)
            }
        }
    }
}

export default Grid
