import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './context/ThemeContext';

import Login from './screens/Login';
import DrawerNavigator from './navigation/Drawer_Sobre';

import { AuthProvider } from './context/auth/AuthProvider'

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <AuthProvider>
      <NavigationContainer>
        <ThemeProvider>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Menu" component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Materias" component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Mapa" component={DrawerNavigator} options={{ headerShown: false }} />
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}
