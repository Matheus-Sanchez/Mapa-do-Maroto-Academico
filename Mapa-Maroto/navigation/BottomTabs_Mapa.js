import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TelaInicial from '../screens/TelaInicial';
import Sobre from '../screens/Sobre';
import Dicas from '../screens/Dicas';
import Mapa1 from '../screens/Mapa1';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Mapa1" component={Mapa1} options={{ headerShown: false }}/>
      <Tab.Screen name="Mapa2" component={Sobre} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}
