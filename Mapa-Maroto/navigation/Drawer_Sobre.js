import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TelaInicial from '../screens/TelaInicial';
import Sobre from '../screens/Sobre';
import Dicas from '../screens/Dicas';
import BottomTabs_TelaInicial from './BottomTabs_TelaInicial';
import BottomTabs_Mapa from './BottomTabs_Mapa';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Inicio" component={TelaInicial} />
      <Drawer.Screen name="Matérias" component={BottomTabs_TelaInicial} />
      <Drawer.Screen name="Mapa" component={BottomTabs_Mapa} />
    </Drawer.Navigator>
  );
}
