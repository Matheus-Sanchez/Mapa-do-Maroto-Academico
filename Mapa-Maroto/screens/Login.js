import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, TouchableOpacity  } from 'react-native';

import { auth } from '../FirebaseConfig'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged  } from 'firebase/auth'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const checkLogin = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuário já está logado
        navigation.replace('MainTabs');
      } 
    });

    return () => checkLogin();
  }, []);

  const handleLogin = async () => {
    if (!email.includes('@') || senha.length < 6) {
      Alert.alert('feitiço inválido');
      alert('feitiço inválido');
    }
    else{
      try {
        const user = await signInWithEmailAndPassword(auth, email, senha)
        if (user)  
          navigation.replace('MainTabs');
      } catch (error) {
        console.log(error)
        alert('Erro ao lançar feitiço: ' + error.message);
      }
    }};

  const handleCreateAccount = async () => {
    if (!email.includes('@') || senha.length < 6) {
      Alert.alert('feitiço inválido');
      alert('feitiço inválido');
    }
    else{
      try {
        const user = await createUserWithEmailAndPassword(auth, email, senha)
        if (user)  
          navigation.replace('MainTabs');
      } catch (error) {
        console.log(error)
        alert('Erro ao lançar feitiço: ' + error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
      source={require('../assets/backlogin.png')} // ou uma URL para imagem remota
      style={styles.background}
      resizeMode="cover" // opções: 'cover', 'contain', 'stretch', 'repeat', 'center'
      >
        <View style={styles.container2}>
          <View style={styles.container3}>
            <Text style={styles.textoH1}>Estamos orgulhosos de apresentar</Text>
          </View>
          <Text style={styles.textoH2}>Coruja de contato:</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />
          <Text style={styles.textoH2}>Juramento solene:</Text>
          <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />
          <View style={styles.button}>
            <TouchableOpacity style={styles.botao} onPress={handleLogin}>
              <Text style={styles.textoBotao}>Juro solenimente não fazer nada de bom</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <Text style={styles.textoBotao}>Gostaria de inscrever a sua varinha? coloque os dados acima e
            <TouchableOpacity onPress={handleCreateAccount}>
              <Text style={styles.link}> clique aqui</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    backgroundColor: "#D3A865",
  },
  textoH1: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center',
  },
  textoH2: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container2: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Escurece a imagem
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container3: {
    alignItems: 'center',
    height: '50%',
  },
  input: {
    borderWidth: 1, padding: 10, marginVertical: 10,
    borderRadius: 5,
    border: '2px solid #ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
  },
  button: { margin: 10},
  image: { width: '100%', height: 500, marginBottom: 10, },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%' ,
    height: '100%',
  },
  botao: {
    backgroundColor: '#5C1B0F', // Altere aqui a cor do fundo
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBotao: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  link: {
    color: "#5C1B0F",
  }
});
