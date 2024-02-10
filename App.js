import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Linking from 'expo-linking';
import React, { useState, useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const prefix= Linking.makeUrl("/")
const Stack = createNativeStackNavigator();
export default App = () => {

  const [data, setdata] = useState(null)

const linking ={
  prefixes:[prefix],
  config:{
    screens:{
      Home:'home',
      Settings:'settings',
    }
  }
}

  function handleDeepLink(event) {
    let data = Linking.parse(event.url)
    setdata(data)
  }
  useEffect(() => {
    async function getInitialURL() {
      const initialURL = await Linking.getInitialURL()
      if (initialURL) setdata(Linking.parse(initialURL))
    }
    Linking.addEventListener("url", handleDeepLink)
    if (!data) {
      getInitialURL()
    }
    return () => {
      Linking.removeEventListener("url")
    }
  }, [])
  return (
    // <View style={styles.container}>
    //   <Text>{data ? JSON.stringify(data) : "App not open from deep link"}</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Settings" component={SettingsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
