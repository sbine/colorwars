import Grid from './grid'
import Turn from './turn'

class Game {
    constructor(options) {
        this.options = options
    }

    start() {
        this.turns = []
        this.color = this.options.startingColor
        this.grid = new Grid({
            startingColor: this.options.startingColor,
            colors: this.options.colors,
            width: this.options.columns || 4,
            height: this.options.rows || 4,
        })
        this.grid.generate()
        this.gameOver = false
        this.scores = Array(this.options.players + 1 || 1).fill(0)
    }

    colorIsTaken(newColor) {
        return newColor == this.color || (this.options?.players > 1 && (newColor == this.grid.getCellAt(0, 0).color || newColor == this.grid.getCellAt(this.options.columns - 1, this.options.rows - 1).color))
    }

    changeColor(newColor, player) {
        if (this.colorIsTaken(newColor)) {
            return
        }

        const lastColor = this.color
        this.color = newColor

        const tilesChanged = this.grid.setColor(newColor, player)
        const newTiles = this.grid.newTiles.length || 0
        this.turns.push(new Turn(lastColor, newColor, newTiles, player))
        this.scores[player] = this.scores[player] + newTiles

        if (tilesChanged + newTiles >= (this.options.columns * this.options.rows / this.options.players)) {
            this.gameOver = true

            if (!this.highScore || this.turns.length < this.highScore) {
                this.highScore = this.turns.length
            }
        }

        return newColor
    }

    playerColor(player) {
        const cornerIndex = player == 1 ? this.grid.cells.length - 1 : 0

        return this.grid.cells[cornerIndex]?.color
    }
}

export default Game
