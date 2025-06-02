import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import BottomTabs_TelaInicial from './navigation/BottomTabs_TelaInicial';
import DrawerNavigator from './navigation/Drawer_Sobre';

import { AuthProvider } from './context/auth/AuthProvider'
import Sobre from './screens/Sobre';
import Mapa from './screens/Mapa1';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Capa">
          <Stack.Screen name="Capa" component={Login} />
          <Stack.Screen name="MainTabs" component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Sobre" component={BottomTabs_TelaInicial} />
          <Stack.Screen name="Mapa" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
