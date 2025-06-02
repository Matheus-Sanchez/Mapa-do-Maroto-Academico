import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../FirebaseConfig';

export default function LogoutScreen({ navigation }) {
  useEffect(() => {
    const logout = async () => {
      try {
        await signOut(auth);
        navigation.replace('Login');
      } catch (error) {
        console.log('Erro ao fazer logout:', error);
      }
    };

    logout();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
}
