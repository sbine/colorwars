import { useEffect, useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import ColorSelector from './ColorSelector'
import GameOver from './GameOver'
import Scoreboard from './Scoreboard'
import Settings from './Settings'
import Game from '../src/game'
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

const columns = 11
const rows = 15

export default ({ darkMode, setDarkMode }) => {
    const [cells, setCells] = useState([])
    const [currentColor, setCurrentColor] = useState(0)
    const [currentTheme, setCurrentTheme] = useState(0)
    const game = useRef(new Game({
        columns,
        rows,
        colors: themes[currentTheme],
        startingColor: currentColor,
    }))

    const gameOver = game.current.gameOver
    const highScore = game.current.highScore
    const turns = game.current.turns?.length

    useEffect(() => {
        // start a new game when loading in
        // @todo save/resume games
        // restart()
    }, [])

    const restart = () => {
        game.current.start()
        setCells(game.current.grid.cells)
    }

    const changeColor = (color, lastColor) => {
        game.current.changeColor(color)
        setCurrentColor(color)
    }

    const changeTheme = (theme) => {
        setCurrentTheme((currentTheme + 1) % themes.length)
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
                highScore={highScore}
                turns={turns}
            />

            {gameOver && <GameOver onRestart={restart} />}

            <View style={tw`flex-grow items-center justify-center`}>
                <FlatList
                    data={cells}
                    getItemLayout={(data, index) => (
                        { length: 8 * 4, offset: 8 * 4 * index, index }
                    )}
                    initialNumToRender={cells.length}
                    numColumns={columns}
                    refreshing={!cells.length}
                    removeClippedSubviews={false}
                    renderItem={({ item }) => <View style={tw`h-8 w-8 bg-${themes[currentTheme][item.color]} border border-gray-100`} />}
                    scrollEnabled={false}
                />
            </View>

            {!gameOver && <ColorSelector
                colors={themes[currentTheme]}
                currentColor={currentColor}
                disabled={gameOver}
                onChange={(color, lastColor) => changeColor(color, lastColor)}
            />}
        </View>
    )
}
