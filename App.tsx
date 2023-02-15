/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import StackNavigation from './components/StackNavigation';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

const myTheme = DefaultTheme;
myTheme.colors.background = "#333333";

function App(): JSX.Element {

  return (
    <NavigationContainer theme={myTheme}>
      <StackNavigation />
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    backgroundColor: "#333333"
  }
});

export default App;
