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
    }

    changeColor(newColor) {
        if (newColor == this.color) {
            return
        }

        const lastColor = this.color
        this.color = newColor

        const tilesChanged = this.grid.setColor(newColor)
        const newTiles = this.grid.newTiles.length || 0
        this.turns.push(new Turn(lastColor, newColor, newTiles))

        if (tilesChanged + newTiles == this.options.columns * this.options.rows) {
            this.gameOver = true

            if (!this.highScore || this.turns.length < this.highScore) {
                this.highScore = this.turns.length
            }
        }
    }
}

export default Game
