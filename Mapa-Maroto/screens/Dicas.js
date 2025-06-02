import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';
import { deleteDoc, updateDoc, doc, 
  addDoc, getDocs, collection } from 'firebase/firestore'; 

import { db } from '../FirebaseConfig'

export default function Dicas({ navigation }) {
  const [dicas, setDicas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const fetchData = async() =>{
    try{
      const querySnapshot = await getDocs(collection(db, 'dicas_pets'))
      const lista = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
      setDicas(lista);
    }catch(error){
      console.log(error)
    }
  }
  //Buscar dicas 
  useEffect(() => {
    fetchData()

  }, []);

  // Salvar ou atualizar dica
  const salvarDica = async () => {
    if (!titulo || !descricao) return;
    console.log(editandoId);
    
    if (editandoId != null) {
      const ref = doc(db, 'dicas_pets', editandoId)
      try {
        await updateDoc(ref, {
          titulo,
          descricao
        })
      } catch (error) {
        console.log(error)
      }
      fetchData()
    } else {
      try {
        await addDoc(collection(db, 'dicas_pets'), {
          titulo,
          descricao
        })
      } catch (error) {
        console.log(error)
      }
      fetchData()
    }

    setTitulo('');
    setDescricao('');
    setEditandoId(null);
    setModalVisible(false);
  };

  //Deletar dica
  const deletarDica = async (id) => {
    const ref = doc(db, 'dicas_pets', id)
    await deleteDoc(ref);
    fetchData()
  };

  const editarDica = (item) => {
    setTitulo(item.titulo);
    setDescricao(item.descricao);
    setEditandoId(item.id);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dicas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.dicaItem}>
            <Text style={styles.tipTitle}>{item.titulo}</Text>
            <Text style={styles.tipDesc}>{item.descricao}</Text>
            <View style={styles.actions}>
              <Button title="Editar" onPress={() => editarDica(item)} />
              <Button title="Excluir" color="red" onPress={() => deletarDica(item.id)} />
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Adicionar Matéria</Text>
      </TouchableOpacity>

      <Button title="Voltar" onPress={() => navigation.goBack()} />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Título"
            value={titulo}
            onChangeText={setTitulo}
            style={styles.input}
          />
          <TextInput
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            style={styles.input}
            multiline
          />
          <Button title={editandoId ? "Atualizar" : "Salvar"} onPress={salvarDica} />
          <Button title="Cancelar" color="gray" onPress={() => {
            setModalVisible(false);
            setTitulo('');
            setDescricao('');
            setEditandoId(null);
          }} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  dicaItem: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  tipDesc: {
    fontSize: 14,
    marginTop: 4
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10
  }
});
