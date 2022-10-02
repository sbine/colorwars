import { useEffect, useState } from 'react'
import { View } from 'react-native'
import ColorSelector from './ColorSelector'
import Grid from './Grid'
import Scoreboard from './Scoreboard'
import Turn from '../src/turn'
import Settings from './Settings'
import Text from './Text'
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

export default ({ darkMode, setDarkMode }) => {
    const [currentColor, setCurrentColor] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [lastColor, setLastColor] = useState()
    const [score, setScore] = useState(0)
    const [turns, setTurns] = useState([])
    const [currentTheme, setCurrentTheme] = useState(0)

    const columns = 11
    const rows = 15

    useEffect(() => {
        if (turns.length && turns[0].tilesChanged + score === (rows * columns)) {
            setGameOver(true)
        }
    }, [turns])

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

    return (
        <View style={tw`flex-1 w-full max-w-3xl mx-auto`}>
            <Settings
                currentTheme={currentTheme}
                darkMode={darkMode}
                onChangeDarkMode={setDarkMode}
                onChangeTheme={changeTheme}
                themes={themes}
            />

            <Scoreboard
                score={score}
                turns={turns.length}
            />

            {gameOver ? <Text>Game Over!</Text> : null}

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
