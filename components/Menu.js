import { TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import tw from 'twrnc'
import Modal from './Modal'
import Text from './Text'

export default ({ gameMode, onChangeGameMode = () => { } }) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(false)
    }, [gameMode])

    return (
        <View style={tw`items-end mt-2`}>
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
                <FontAwesomeIcon icon={faBars} size={30} style={tw`dark:text-gray-100`} />
            </TouchableOpacity>

            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <View style={tw`flex-row flex-wrap mx-auto`}>
                    <TouchableOpacity
                        onPress={() => { onChangeGameMode(1) }}
                        style={tw.style(`w-1/3 items-center border border-gray-300 rounded p-4 mr-4`, { 'bg-gray-300 dark:bg-gray-700': gameMode === 1 })}
                    >
                        <Text style={tw`text-3xl uppercase my-1`}>Solo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { onChangeGameMode(2) }}
                        style={tw.style(`w-1/3 items-center border border-gray-300 rounded p-4 ml-4`, { 'bg-gray-300 dark:bg-gray-700': gameMode === 2 })}
                    >
                        <Text style={tw`text-3xl uppercase my-1`}>Duo</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}
