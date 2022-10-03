import { View } from 'react-native'
import tw from 'twrnc'
import Text from './Text'

export default ({ currentPlayer, gameMode, highScore, scores, turns }) => {
    return (
        <View style={tw`flex-row items-center justify-between web:min-h-36 p-4`}>
            {gameMode === 1
                ? <>
                    <Text style={tw`flex-1`} />

                    <View style={tw`flex-1 items-center`}>
                        <Text style={tw`text-3xl uppercase mb-2`}>Turns</Text>

                        <Text style={tw`text-5xl font-bold`}>{turns}</Text>
                    </View>

                    <View style={tw`flex-1 items-center justify-center`}>
                        {highScore ?
                            <>
                                <Text style={tw`text-lg uppercase mb-1`}>Best</Text>

                                <Text style={tw`text-2xl font-bold`}>{highScore}</Text>
                            </>
                            : null
                        }
                    </View>
                </>
                :
                <>
                    <View style={tw.style(`flex-1 items-center justify-center`, { 'border-2 border-gray-500 dark:border-gray-300': currentPlayer == 0 })}>
                        <Text style={tw`text-lg uppercase mb-1`}>Player 1</Text>

                        <Text style={tw`text-2xl font-bold`}>{scores[0]}</Text>
                    </View>

                    <View style={tw.style(`flex-1 items-center justify-center`, { 'border-2 border-gray-500 dark:border-gray-300': currentPlayer == 1 })}>
                        <Text style={tw`text-lg uppercase mb-1`}>Player 2</Text>

                        <Text style={tw`text-2xl font-bold`}>{scores[1]}</Text>
                    </View>
                </>
            }
        </View>
    )
}
