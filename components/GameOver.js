import tw from 'twrnc'
import Button from './Button'
import Text from './Text'

export default ({ onRestart }) => {
    return (
        <>
            <Text style={tw`font-bold uppercase text-center text-lg text-red-700 dark:text-red-400 mb-4`}>
                Game Over
            </Text>

            <Button onPress={onRestart} style={tw`bg-red-300 dark:bg-red-700 mx-auto p-2 mb-4`}>New Game</Button>
        </>
    )
}
