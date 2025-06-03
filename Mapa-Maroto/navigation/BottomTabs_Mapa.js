import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mapa2 from '../screens/Mapa2';
import Mapa1 from '../screens/Mapa1';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Academico 1" component={Mapa1} options={{ headerShown: false }}/>
      <Tab.Screen name="Academico 2" component={Mapa2} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}
