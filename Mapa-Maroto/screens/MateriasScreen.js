import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  Modal, Button, StyleSheet
} from 'react-native';
import {
  collection, doc, getDocs, addDoc,
  updateDoc, deleteDoc
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../FirebaseConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function MateriasScreen({navigation}) {
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
    }
  };

  const salvarMateria = async () => {
    if (!materia || !salaNumero || !salaLetra || !dia) return;

    try {
      const ref = collection(db, 'usuarios', userId, 'materias');

      if (editandoId) {
        const docRef = doc(ref, editandoId);
        await updateDoc(docRef, { materia, salaNumero, salaLetra, dia });
      } else {
        await addDoc(ref, { materia, salaNumero, salaLetra, dia });
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
    }
  };

  const deletarMateria = async (id) => {
    try {
      const ref = doc(db, 'usuarios', userId, 'materias', id);
      await deleteDoc(ref);
      fetchMaterias(userId);
    } catch (error) {
      console.log('Erro ao deletar matéria:', error);
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
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas Matérias</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="arrow-back" size={28} color="#5C1B0F" />
      </TouchableOpacity>
      <FlatList
        data={materias}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}><Icon name="library-books" size={24} color="#5C1B0F" style={styles.iconButton}/>{item.materia}</Text>
            <Text style={styles.text}>Sala: {item.salaLetra}{item.salaNumero}</Text>
            <Text style={styles.text}>Dia da Semana: {item.dia}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => editarMateria(item)} style={styles.iconButton}>
                <Icon name="edit" size={24} color="#5C1B0F" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletarMateria(item.id)} style={styles.iconButton}>
                <Icon name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.botao} onPress={() => setModalVisible(true)}>
        <Icon name="add" size={24} color="#F5ECD7" />
      </TouchableOpacity>


      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.texto}>Matéria</Text>
            <TextInput style={styles.input} placeholder="Matemática" value={materia} onChangeText={setMateria}/>
            <Text style={styles.texto}>Numero da Sala</Text>
            <TextInput style={styles.input} placeholder="137" value={salaNumero} onChangeText={setSalaNumero}/>
            <Text style={styles.texto}>Letra/Corredor da Sala</Text>
            <TextInput style={styles.input} placeholder="C" value={salaLetra} onChangeText={setSalaLetra}/>
            <Text style={styles.texto}>Dia da semana</Text>
            <TextInput style={styles.input} placeholder="Terça" value={dia} onChangeText={setDia} />
            <View style={styles.areaBotao}>
              <Button style={styles.modalButtons} title={editandoId ? "Atualizar" : "Salvar"} color="#5C1B0F" onPress={salvarMateria} />
              <Button style={styles.modalButtons} title="Cancelar" color="gray" onPress={() => {
                setModalVisible(false);
                setMateria('');
                setSalaNumero('');
                setSalaLetra('');
                setDia('');
                setEditandoId(null);
              }} />
            </View>
            </View>
          </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5ECD7', },
  item: {
    backgroundColor: '#FFF8DC',
    borderWidth: 1,
    borderColor: '#D4AF37',
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
    color: '#5C1B0F',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  text: { fontSize: 16, fontFamily: 'serif',},
  texto: { fontSize: 16, alignSelf: 'flex-start', color:'white', fontFamily: 'serif', },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  botao: {
    backgroundColor: '#5C1B0F',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D4AF37',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  textoBotao: {
    color: '#F5ECD7',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    fontFamily: 'serif',
  },
  modalButtons: {
    margin: 20,
    alignItems: 'center',
    backgroundColor: '#5C1B0F',
    width: '75%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'rgba(255,255,255,0.5)',
    fontFamily: 'serif',
  },
  areaBotao: {
    justifyContent: 'space-evenly'
  },
  iconButton: {
    marginHorizontal: 5,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#FFF8DC',
    borderRadius: 20,
    padding: 6,
    elevation: 2,
  },
  
});
