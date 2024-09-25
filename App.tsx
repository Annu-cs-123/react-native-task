import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/views/Home';
import LogIn from './src/views/LogIn';
import store from './src/store';
import Welcome from './src/views/Welcome';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="LogIn" component={LogIn} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
