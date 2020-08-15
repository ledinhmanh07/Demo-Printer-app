import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './source/HomeScreen';
import tsc from './source/tsc';
import esc from './source/escpos';
// import apptest from './apptest';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="AppTest" component={apptest} /> */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TSC" component={tsc} />
          <Stack.Screen name="ESC" component={esc} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
