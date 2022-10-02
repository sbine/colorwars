import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Game from './components/Game'
import tw from 'twrnc'

export default function App() {
  return (
    <View style={tw`flex-1 bg-white`}>
      <SafeAreaProvider>
        <SafeAreaView style={tw`flex-1`}>
          <StatusBar style="auto" />

          <Game />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  )
}
