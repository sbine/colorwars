import { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import tw from 'twrnc'
import Grid from '../src/grid'

export default ({
    width = 10,
    height = 15,
    colors = ['red-400', 'green-400', 'blue-400', 'purple-400'],
    currentColor,
    onGameOver = () => { },
    onScoreChange = () => { }
}) => {
    const [cells, setCells] = useState([])
    const [grid, setGrid] = useState()

    useEffect(() => {
        const grid = new Grid({
            startingColor: currentColor,
            colors: colors,
            width: width,
            height: height,
        })

        setGrid(grid)
        setCells(grid.generate())
    }, [])

    useEffect(() => {
        if (grid) {
            const newScore = grid.setColor(currentColor)

            setCells(grid.cells)
            onScoreChange(newScore)

            if (newScore == grid.options.width * grid.options.height) {
                console.log('game over?')
                onGameOver()
            }
        }
    }, [currentColor])

    return (
        <View style={tw`flex-grow items-center justify-center`}>
            <FlatList
                data={cells}
                getItemLayout={(data, index) => (
                    { length: 8 * 4, offset: 8 * 4 * index, index }
                )}
                initialNumToRender={cells.length}
                numColumns={width}
                refreshing={!cells.length}
                removeClippedSubviews={false}
                renderItem={({ item }) => <View style={tw`h-8 w-8 bg-${colors[item.color]} border border-gray-100`} />}
                scrollEnabled={false}
            />
        </View>
    )
}
