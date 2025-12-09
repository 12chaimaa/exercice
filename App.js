import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Jeu from './jeu';
import Resultats from './resultats';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1e90ff' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        <Stack.Screen
          name="Jeu"
          component={Jeu}
          options={{ title: 'Jeu du Code Secret' }}
        />

        <Stack.Screen
          name="Resultats"
          component={Resultats}
          options={{ title: 'Résultats' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}