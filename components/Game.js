import { useState } from 'react'
import { Text, View } from 'react-native'
import ColorSelector from './ColorSelector'
import Grid from './Grid'
import Scoreboard from './Scoreboard'
import Turn from '../src/turn'
import Settings from './Settings'
import tw from 'twrnc'

const themes = [
    [
        'blue-400',
        'green-400',
        'red-400',
        'purple-400',
    ],
    [
        'rose-400',
        'teal-400',
        'amber-400',
        'lime-400',
    ],
]

export default () => {
    const [currentColor, setCurrentColor] = useState(0)
    const [lastColor, setLastColor] = useState()
    const [score, setScore] = useState(0)
    const [turns, setTurns] = useState([])
    const [currentTheme, setCurrentTheme] = useState(Math.floor(Math.random() * themes.length))

    const columns = 11
    const rows = 15

    const changeColor = (color) => {
        setLastColor(currentColor)
        setCurrentColor(color)
    }

    const changeTheme = () => {
        setCurrentTheme((currentTheme + 1) % themes.length)
    }

    const updateScore = (newScore) => {
        turns.push(new Turn(lastColor, currentColor, newScore))
        setTurns(turns)
        setScore(score + newScore)
    }

    const gameOver = turns.length &&
        turns[0].tilesChanged + score.length === (rows * columns)

    return (
        <View style={tw`flex-1`}>
            <Settings
                currentTheme={currentTheme}
                onChangeTheme={changeTheme}
                themes={themes}
            />

            <Scoreboard
                score={score}
                turns={turns.length}
            />

            <Grid
                colors={themes[currentTheme]}
                currentColor={currentColor}
                height={rows}
                width={columns}
                onScoreChange={updateScore}
            />

            <ColorSelector
                colors={themes[currentTheme]}
                currentColor={currentColor}
                disabled={gameOver}
                onChange={color => changeColor(color)}
            />
        </View>
    )
}
