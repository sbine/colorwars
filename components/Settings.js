import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import tw from 'twrnc'
import ColorSelector from './ColorSelector'

export default ({ currentTheme, onChangeTheme = () => { }, themes }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <View style={tw`items-end py-2`}>
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
                <FontAwesomeIcon icon={faGear} size={30} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={isOpen}
                onRequestClose={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <SafeAreaProvider>
                    <SafeAreaView style={tw`w-full h-full px-4 py-2`}>
                        <TouchableOpacity style={tw`self-end`} onPress={() => setIsOpen(false)}>
                            <FontAwesomeIcon icon={faTimes} size={34} />
                        </TouchableOpacity>

                        <Text style={tw`text-3xl`}>Theme</Text>

                        {themes.map((theme, index) => (
                            <ColorSelector
                                key={index}
                                colors={theme}
                                size='small'
                                style={tw`${currentTheme === index ? 'border-2 border-gray-300' : ''}`}
                                onChange={onChangeTheme}
                            />
                        ))}
                    </SafeAreaView>
                </SafeAreaProvider>
            </Modal>
        </View>
    )
}
