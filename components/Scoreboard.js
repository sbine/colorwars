import { Text, View } from 'react-native'
import tw from 'twrnc'

export default ({ score, turns }) => {
    return (
        <View style={tw`flex-row justify-between p-2`}>
            <Text style={tw`flex-1`} />

            <View style={tw`flex-1 items-center`}>
                <Text style={tw`text-3xl uppercase mb-2`}>Score</Text>

                <Text style={tw`text-5xl font-bold`}>{score}</Text>
            </View>

            <View style={tw`flex-1 items-center justify-center`}>
                <Text style={tw`text-xl`}>{`${turns} turn${turns !== 1 ? 's' : ''}`}</Text>
            </View>
        </View>
    )
}
