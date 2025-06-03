import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  Modal, StyleSheet, Alert
} from 'react-native';
import {
  collection, doc, getDocs, addDoc,
  updateDoc, deleteDoc
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../FirebaseConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';


export default function MateriasScreen({navigation}) {
  const { theme } = useTheme();
  const [materias, setMaterias] = useState([]);
  const [userId, setUserId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [materia, setMateria] = useState('');
  const [salaNumero, setSalaNumero] = useState('');
  const [salaLetra, setSalaLetra] = useState('');
  const [dia, setDia] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUserId(user.uid);
        fetchMaterias(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  const fetchMaterias = async (uid) => {
    try {
      const ref = collection(db, 'usuarios', uid, 'materias');
      const snapshot = await getDocs(ref);
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMaterias(lista);
    } catch (error) {
      console.log('Erro ao buscar matérias:', error);
      Alert.alert("Erro", "Não foi possível carregar suas matérias.");
    }
  };

  const salvarMateria = async () => {
    if (!materia || !salaNumero || !salaLetra || !dia) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    try {
      const ref = collection(db, 'usuarios', userId, 'materias');

      if (editandoId) {
        const docRef = doc(ref, editandoId);
        await updateDoc(docRef, { materia, salaNumero, salaLetra, dia });
        Alert.alert("Sucesso", "Matéria atualizada com sucesso!");
      } else {
        await addDoc(ref, { materia, salaNumero, salaLetra, dia });
        Alert.alert("Sucesso", "Matéria adicionada com sucesso!");
      }

      fetchMaterias(userId);
      setMateria('');
      setSalaNumero('');
      setSalaLetra('');
      setDia('');
      setEditandoId(null);
      setModalVisible(false);
    } catch (error) {
      console.log('Erro ao salvar matéria:', error);
      Alert.alert("Erro", "Não foi possível salvar a matéria.");
    }
  };

  const deletarMateria = async (id) => {
    try {
      const ref = doc(db, 'usuarios', userId, 'materias', id);
      await deleteDoc(ref);
      Alert.alert("Sucesso", "Matéria removida com sucesso!");
      fetchMaterias(userId);
    } catch (error) {
      console.log('Erro ao deletar matéria:', error);
      Alert.alert("Erro", "Não foi possível remover a matéria.");
    }
  };

  const editarMateria = (item) => {
    setMateria(item.materia);
    setSalaNumero(item.salaNumero);
    setSalaLetra(item.salaLetra);
    setDia(item.dia);
    setEditandoId(item.id);
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Botão de troca de tema */}
      <View style={styles.themeToggleContainer}>
        <ThemeToggle />
      </View>
      
      <Text style={[styles.titulo, { color: theme.primary }]}>Minhas Matérias</Text>
      
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backButton, { backgroundColor: theme.card }]}
      >
        <Icon name="arrow-back" size={28} color={theme.icon} />
      </TouchableOpacity>
      
      <FlatList
        data={materias}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.item, { 
            backgroundColor: theme.card,
            borderColor: theme.cardBorder
          }]}>
            <Text style={[styles.text, { color: theme.text }]}>
              <Icon name="library-books" size={24} color={theme.icon} style={styles.iconButton}/>
              {item.materia}
            </Text>
            <Text style={[styles.text, { color: theme.text }]}>Sala: {item.salaLetra}{item.salaNumero}</Text>
            <Text style={[styles.text, { color: theme.textSecondary }]}>Dia da Semana: {item.dia}</Text>
            <View style={styles.actions}>
              <TouchableOpacity 
                onPress={() => editarMateria(item)} 
                style={[styles.iconButton, { backgroundColor: theme.background }]}
              >
                <Icon name="edit" size={24} color={theme.icon} />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => deletarMateria(item.id)} 
                style={[styles.iconButton, { backgroundColor: theme.background }]}
              >
                <Icon name="delete" size={24} color={theme.error} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Você ainda não cadastrou nenhuma matéria.
          </Text>
        }
      />

      <TouchableOpacity 
        style={[styles.botao, { 
          backgroundColor: theme.primary,
          borderColor: theme.secondary
        }]} 
        onPress={() => {
          setEditandoId(null);
          setMateria('');
          setSalaNumero('');
          setSalaLetra('');
          setDia('');
          setModalVisible(true);
        }}
      >
        <Icon name="add" size={24} color={theme.headerText} />
      </TouchableOpacity>


      <Modal 
        visible={modalVisible} 
        transparent 
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
          setEditandoId(null);
          setMateria('');
          setSalaNumero('');
          setSalaLetra('');
          setDia('');
        }}
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.modalBg }]}>
          <View style={[styles.modalView, { 
            backgroundColor: theme.card,
            borderColor: theme.cardBorder
          }]}>
            <Text style={[styles.modalTitulo, { color: theme.primary }]}>
              {editandoId ? 'Editar Matéria' : 'Nova Matéria'}
            </Text>
            
            <Text style={[styles.texto, { color: theme.text }]}>Matéria</Text>
            <TextInput 
              style={[styles.input, { 
                backgroundColor: theme.background,
                borderColor: theme.cardBorder,
                color: theme.text 
              }]} 
              placeholder="Matemática" 
              placeholderTextColor={theme.textSecondary}
              value={materia} 
              onChangeText={setMateria}
            />
            
            <Text style={[styles.texto, { color: theme.text }]}>Número da Sala</Text>
            <TextInput 
              style={[styles.input, { 
                backgroundColor: theme.background,
                borderColor: theme.cardBorder,
                color: theme.text 
              }]} 
              placeholder="137" 
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
              value={salaNumero} 
              onChangeText={setSalaNumero}
            />
            
            <Text style={[styles.texto, { color: theme.text }]}>Letra/Corredor da Sala</Text>
            <TextInput 
              style={[styles.input, { 
                backgroundColor: theme.background,
                borderColor: theme.cardBorder,
                color: theme.text 
              }]} 
              placeholder="C" 
              placeholderTextColor={theme.textSecondary}
              value={salaLetra} 
              onChangeText={setSalaLetra}
              maxLength={1}
            />
            
            <Text style={[styles.texto, { color: theme.text }]}>Dia da semana</Text>
            <TextInput 
              style={[styles.input, { 
                backgroundColor: theme.background,
                borderColor: theme.cardBorder,
                color: theme.text 
              }]} 
              placeholder="Terça" 
              placeholderTextColor={theme.textSecondary}
              value={dia} 
              onChangeText={setDia} 
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.botao, { 
                  backgroundColor: theme.primary,
                  borderColor: theme.secondary 
                }]} 
                onPress={salvarMateria}
              >
                <Text style={[styles.textoBotao, { color: theme.headerText }]}>
                  {editandoId ? "Atualizar" : "Salvar"}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.botaoSecundario, { borderColor: theme.primary }]}
                onPress={() => {
                  setModalVisible(false);
                  setMateria('');
                  setSalaNumero('');
                  setSalaLetra('');
                  setDia('');
                  setEditandoId(null);
                }}
              >
                <Text style={[styles.textoBotaoSecundario, { color: theme.primary }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
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
    padding: 20, 
  },
  themeToggleContainer: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 10,
  },
  item: {
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  text: { 
    fontSize: 16, 
    fontFamily: 'serif',
    marginBottom: 5,
  },
  texto: { 
    fontSize: 16, 
    alignSelf: 'flex-start',
    fontFamily: 'serif', 
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  botao: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 5,
  },
  botaoSecundario: {
    backgroundColor: 'transparent',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    marginVertical: 5,
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  textoBotaoSecundario: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalView: {
    borderRadius: 12,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'serif',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    width: '100%',
    fontFamily: 'serif',
  },
  iconButton: {
    marginHorizontal: 5,
    padding: 6,
    borderRadius: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    borderRadius: 20,
    padding: 6,
    elevation: 2,
    zIndex: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 30,
    fontFamily: 'serif',
  },
});
