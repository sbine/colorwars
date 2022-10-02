import { View } from 'react-native'
import tw from 'twrnc'
import Text from './Text'

export default ({ highScore, score, turns }) => {
    return (
        <View style={tw`flex-row items-center justify-between web:min-h-36 py-4`}>
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
        </View>
    )
}
