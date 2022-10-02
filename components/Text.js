import React from 'react'
import { Text as BaseText } from 'react-native'
import tw from 'twrnc'

export default ({ children, style, ...props }) => {
    return (
        <BaseText style={tw.style('text-gray-900 dark:text-gray-100', style)} {...props}>
            {children}
        </BaseText>
    )
}
