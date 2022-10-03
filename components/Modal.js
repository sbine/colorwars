import { Modal, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import tw from 'twrnc'

export default ({ children, open = false, onClose = () => { } }) => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={open}
            onRequestClose={onClose}
        >
            <SafeAreaProvider>
                <SafeAreaView style={tw`flex-1 bg-white dark:bg-black`}>
                    <View style={tw`w-full h-full max-w-3xl mx-auto px-4 py-2`}>
                        <TouchableOpacity style={tw`self-end`} onPress={onClose}>
                            <FontAwesomeIcon icon={faTimes} size={34} style={tw`dark:text-gray-100`} />
                        </TouchableOpacity>

                        {children}
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </Modal>
    )
}
