import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, Alert, ImageBackground,
  TouchableOpacity, Modal, Pressable
} from 'react-native';

import { auth } from '../FirebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newSenha, setNewSenha] = useState('');

  useEffect(() => {
    const checkLogin = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace('Menu');
      }
    });
    return () => checkLogin();
  }, []);

  const handleLogin = async () => {
    if (!email.includes('@') || senha.length < 6) {
      Alert.alert('Feitiço inválido');
      return;
    }
    if (email == "" || senha.length == 0) {
      Alert.alert('Não acha que esta faltando alguma coisa?');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.replace('Menu');
    } catch (error) {
      Alert.alert('Erro ao lançar feitiço', error.message);
    }
  };

  const handleCreateAccount = async () => {
    if (!newEmail.includes('@') || newSenha.length < 6) {
      Alert.alert('Senha precisa de mais de 6 letras ou email precisa ser válido');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, newEmail, newSenha);
      setModalVisible(false);
      navigation.replace('Menu');
    } catch (error) {
      Alert.alert('Erro ao lançar feitiço', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/backlogin.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container2}>
          <View style={styles.container3}>
            <Text style={styles.textoH1}>Estamos orgulhosos de apresentar</Text>
          </View>
          <Text style={styles.textoH2}>Coruja de contato:</Text>
          <TextInput 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
            placeholderTextColor="#ccc" 
            placeholder="seu@email.com" 
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.textoH2}>Juramento solene:</Text>
          <TextInput 
            style={styles.input} 
            value={senha} 
            onChangeText={setSenha} 
            secureTextEntry 
            placeholder="senha mágica" 
            placeholderTextColor="#ccc" 
          />
          <TouchableOpacity style={styles.botao} onPress={handleLogin}>
            <Text style={styles.textoBotao}>Juro solenemente não fazer nada de bom</Text>
          </TouchableOpacity>

          <Text style={styles.textoBotao}>
            Inscreva-se para receber sua carta de admissão! 
            <Text style={styles.link} onPress={() => setModalVisible(true)}> clique aqui</Text>
          </Text>
        </View>
      </ImageBackground>

      
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitulo}>Carta de admissão</Text>
            <TextInput
              style={styles.input}
              placeholder="Nova coruja de contato"
              placeholderTextColor="#ccc"
              value={newEmail}
              onChangeText={setNewEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Novo juramento solene"
              placeholderTextColor="#ccc"
              value={newSenha}
              onChangeText={setNewSenha}
              secureTextEntry
            />
            <View style={styles.modalButtons}>
              <Pressable style={styles.botao} onPress={handleCreateAccount}>
                <Text style={styles.textoBotao}>Concluir Cadastro</Text>
              </Pressable>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.link}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3A865",
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  container2: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container3: {
    alignItems: 'center',
    marginBottom: '50%',
  },
  textoH1: {
    color: '#f0e6d2',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textoH2: {
    color: '#f0e6d2',
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
  },
  botao: {
    backgroundColor: '#5C1B0F',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  link: {
    color: "#D3A865",
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 20,
    width: '85%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitulo: {
    fontSize: 22,
    color: '#D3A865',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  modalButtons: {
    marginTop: 20,
    alignItems: 'center',
  },
});
