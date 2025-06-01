import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Sobre from '../screens/Sobre';
import Dicas from '../screens/Dicas';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Matérias" component={Dicas} options={{ headerShown: false }} />
      <Tab.Screen name="Amigos" component={Sobre} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
