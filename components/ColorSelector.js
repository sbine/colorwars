import { TouchableOpacity, View } from 'react-native'
import tw from 'twrnc'

export default ({ currentColor, colors = [], disabled = false, onChange = () => { }, size = 'default', style = {} }) => {
    return (
        <View style={tw.style(`flex-row items-center justify-center p-2`, style)}>
            {colors.map((color, index) =>
                <TouchableOpacity
                    key={color}
                    accessibilityLabel={color}
                    accessibilityRole='button'
                    accessibilityState={{ disabled, selected: color === currentColor }}
                    disabled={disabled}
                    style={tw.style(`h-12 w-12 bg-${color} mx-4`, { 'mx-1': size === 'small' }, { 'border-4 border-gray-500': currentColor == index })}
                    onPress={color => color != currentColor && onChange(index)}
                />
            )}
        </View>
    )
}
