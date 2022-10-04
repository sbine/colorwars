import { useEffect, useRef, useState } from 'react'
import { FlatList, ScrollView, View } from 'react-native'
import ColorSelector from './ColorSelector'
import GameOver from './GameOver'
import Menu from './Menu'
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

const columns = 12
const rows = 15

export default ({ darkMode, setDarkMode }) => {
    const [cells, setCells] = useState([])
    const [currentColor, setCurrentColor] = useState(0)
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [currentTheme, setCurrentTheme] = useState(0)
    const [gameMode, setGameMode] = useState(1)
    const [width, setWidth] = useState()
    const game = useRef(new Game({
        columns,
        rows,
        players: gameMode,
        colors: themes[currentTheme],
        startingColor: currentColor,
    }))

    const gameOver = game.current.gameOver
    const highScore = game.current.highScore
    const turns = game.current.turns?.length
    const scores = game.current.scores

    useEffect(() => {
        // start a new game when loading in
        // @todo save/resume games
        restart()
    }, [])

    useEffect(() => {
        restart()
    }, [gameMode])

    const restart = () => {
        setCurrentColor(game.current.options.startingColor)
        setCurrentPlayer(0)
        game.current = new Game({
            columns,
            rows,
            players: gameMode,
            colors: themes[currentTheme],
            startingColor: currentColor,
        })
        game.current.start()
        setCells(game.current.grid.cells)
    }

    const changeColor = (color) => {
        const newColor = game.current.changeColor(color, currentPlayer)
        if (newColor === color) {
            const nextPlayer = (currentPlayer + 1) % gameMode
            setCurrentColor(game.current.playerColor(nextPlayer))
            setCurrentPlayer(nextPlayer)
        }
    }

    const changeTheme = (theme) => {
        setCurrentTheme((currentTheme + 1) % themes.length)
    }

    return (
        <>
            <ScrollView
                style={tw`flex-1 w-full max-w-3xl mx-auto`}
                stickyHeaderIndices={[0]}
            >
                <View>
                    <View style={tw`flex-row items-center justify-between bg-white dark:bg-black py-2`}>
                        <Menu
                            gameMode={gameMode}
                            onChangeGameMode={setGameMode}
                        />

                        <Settings
                            currentTheme={currentTheme}
                            darkMode={darkMode}
                            onChangeDarkMode={setDarkMode}
                            onChangeTheme={changeTheme}
                            themes={themes}
                        />
                    </View>
                </View>

                <Scoreboard
                    currentPlayer={currentPlayer}
                    gameMode={gameMode}
                    highScore={highScore}
                    scores={scores}
                    turns={turns}
                />

                {gameOver && <GameOver onRestart={restart} />}

                <View
                    style={tw`max-w-md mx-auto flex-row flex-wrap flex-grow items-center justify-center`}
                    onLayout={(event) => setWidth(Math.floor(event.nativeEvent.layout.width / columns))}
                >
                    {cells.map((cell, index) =>
                        <View
                            key={index}
                            style={tw.style(`bg-${themes[currentTheme][cell.color]} border border-gray-100`, { width, height: width })}
                        />
                    )}
                </View>
            </ScrollView>

            {!gameOver &&
                <ColorSelector
                    colors={themes[currentTheme]}
                    currentColor={currentColor}
                    currentPlayer={currentPlayer}
                    disabled={gameOver}
                    players={gameMode}
                    onChange={changeColor}
                />
            }
        </>
    )
}
