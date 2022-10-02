import { TouchableOpacity } from 'react-native'
import Text from './Text'
import tw from 'twrnc'

export default ({ children, onPress, style = {} }, ...props) => {
    return (
        <TouchableOpacity onPress={onPress} {...props}>
            <Text style={tw.style(`text-lg text-center`, style)}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}
