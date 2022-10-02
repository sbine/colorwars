import Grid from './grid'
import Turn from './turn'

class Game {
    constructor(options) {
        this.options = options
    }

    start() {
        this.turns = []
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

        const newScore = this.grid.setColor(newColor)
        this.turns.push(new Turn(lastColor, newColor, newScore))

        if (newScore == this.options.columns * this.options.rows) {
            this.gameOver = true

            if (!this.highScore || this.turns.length < this.highScore) {
                this.highScore = this.turns.length
            }
        }
    }
}

export default Game
