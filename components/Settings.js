import { Modal, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons/faCheckSquare'
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear'
import { faSquare } from '@fortawesome/free-solid-svg-icons/faSquare'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import tw from 'twrnc'
import ColorSelector from './ColorSelector'
import Text from './Text'

export default ({ currentTheme, darkMode, onChangeDarkMode = () => { }, onChangeTheme = () => { }, themes }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <TouchableOpacity
                hitSlop={{
                    top: 10,
                    left: 10,
                    bottom: 10,
                    right: 10,
                }}
                style={tw`relative overflow-hidden mx-4 h-8 w-8`}
                onPress={() => setIsOpen(true)}
            >
                <FontAwesomeIcon icon={faGear} size={30} style={tw`dark:text-gray-100`} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={isOpen}
                onRequestClose={() => {
                    setIsOpen(!isOpen)
                }}
            >
                <SafeAreaProvider>
                    <SafeAreaView style={tw`flex-1 bg-white dark:bg-black`}>
                        <View style={tw`w-full h-full max-w-3xl mx-auto px-4 py-2`}>
                            <TouchableOpacity style={tw`self-end`} onPress={() => setIsOpen(false)}>
                                <FontAwesomeIcon icon={faTimes} size={34} style={tw`dark:text-gray-100`} />
                            </TouchableOpacity>

                            <View style={tw`my-2`}>
                                <Text style={tw`text-3xl my-1`}>Theme</Text>

                                {themes.map((theme, index) => (
                                    <ColorSelector
                                        key={index}
                                        colors={theme}
                                        size='small'
                                        style={tw`${currentTheme === index ? 'border-2 border-gray-300 dark:border-gray-600' : ''}`}
                                        onChange={onChangeTheme}
                                    />
                                ))}
                            </View>

                            <View style={tw`flex-row items-center justify-between mt-4`}>
                                <Text style={tw`text-3xl my-1`}>Dark Mode</Text>

                                <TouchableOpacity onPress={() => onChangeDarkMode(!darkMode)}>
                                    <FontAwesomeIcon
                                        icon={darkMode ? faCheckSquare : faSquare}
                                        size={34}
                                        style={tw`text-gray-300 dark:text-gray-100`}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </SafeAreaProvider>
            </Modal>
        </>
    )
}
