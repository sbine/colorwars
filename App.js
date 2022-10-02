import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { View, useColorScheme } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Game from './components/Game'
import tw, { useAppColorScheme, useDeviceContext } from 'twrnc'

export default function App() {
  useDeviceContext(tw, { withDeviceColorScheme: false })
  const colorScheme = useColorScheme()
  const [darkMode, toggleDarkMode, setDarkMode] = useAppColorScheme(tw)

  const isDarkMode = darkMode === 'dark'

  useEffect(() => {
    // sync our dark mode setting with the system setting
    // @todo make this optional
    setDarkMode(colorScheme)
  }, [])

  // dark mode styles aren't applied correctly on 1st render unless applied explicitly
  return (
    <View style={tw.style(`flex-1 bg-white dark:bg-black`, isDarkMode ? 'bg-black' : 'bg-white')}>
      <SafeAreaProvider>
        <SafeAreaView style={tw`flex-1`}>
          <StatusBar style={isDarkMode ? 'light' : 'dark'} />

          <Game
            darkMode={isDarkMode}
            setDarkMode={darkModeEnabled => setDarkMode(darkModeEnabled ? 'dark' : 'light')}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  )
}
