import { TouchableOpacity, View } from 'react-native'
import tw from 'twrnc'

export default ({ currentColor, colors = [], disabled = false, onChange = () => { }, size = 'default', style = {} }, ...props) => {
    const isDisabled = (color) => disabled || color == currentColor

    return (
        <View style={tw.style(`flex-row items-center justify-center p-4`, { 'web:min-h-36': size !== 'small' }, style)}>
            {colors.map((color, index) =>
                <TouchableOpacity
                    key={color}
                    accessibilityLabel={color}
                    accessibilityRole='button'
                    accessibilityState={{ disabled, selected: color === currentColor }}
                    disabled={isDisabled(index)}
                    hitSlop={{
                        top: 5,
                        left: 5,
                        bottom: 5,
                        right: 5,
                    }}
                    style={tw.style(`h-12 w-12 bg-${color} mx-4`, { 'h-8 w-8 mx-1': size === 'small' }, { 'border-4 border-gray-500': currentColor == index })}
                    onPress={color => color != currentColor && onChange(index, currentColor)}
                    {...props}
                />
            )}
        </View>
    )
}
