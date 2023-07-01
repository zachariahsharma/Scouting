import {AppRegistry} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {DataContext} from './DataContext';
import PreliminaryDataPage from './PreliminaryDataPage';
import AutoPage from './AutoPage';
import TeleopEndgamePage from './TeleopEndgamePage';
import ConfirmationPage from './ConfirmationPage';
import TextBoxPage from './TextBoxPage';
const Stack = createStackNavigator();

const App = () => {
  const [data, setData] = useState({});

  return (
    <DataContext.Provider value={{data, setData}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="PreliminaryDataPage"
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="PreliminaryDataPage"
            component={PreliminaryDataPage}
          />
          <Stack.Screen name="AutoPage" component={AutoPage} />
          <Stack.Screen
            name="TeleopEndgamePage"
            component={TeleopEndgamePage}
          />
          <Stack.Screen name="TextBoxPage" component={TextBoxPage} />
          <Stack.Screen name="ConfirmationPage" component={ConfirmationPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataContext.Provider>
  );
};

AppRegistry.registerComponent('Scouting', () => App);
AppRegistry.registerComponent('scouting', () => App);
