import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TelaInicial from '../screens/TelaInicial';
import BottomTabs_Mapa from './BottomTabs_Mapa';
import LogoutScreen from '../components/LogOut'; // importado aqui
import MateriasScreen from '../screens/MateriasScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Inicio" component={TelaInicial} />
      <Drawer.Screen name="Materias" component={MateriasScreen} />
      <Drawer.Screen name="Mapa" component={BottomTabs_Mapa} />
      <Drawer.Screen name="Sair" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}
