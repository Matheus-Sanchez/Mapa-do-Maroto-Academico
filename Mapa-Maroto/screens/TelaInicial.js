import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../FirebaseConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function HomeScreen({navigation}) {
  const [materias, setMaterias] = useState([]);
  const [userId, setUserId] = useState(null);

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

  const acharAcademico = (numero) => {
    return numero < 400 ? 1 : 2;
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{item.materia}</Text>
      <Text style={styles.horario}>Sala: {item.salaNumero}{item.salaLetra}</Text>
      <Text style={styles.academico}>Acadêmico: {acharAcademico(item.salaNumero)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas Matérias</Text>
      <TouchableOpacity
        onPress={() => userId && fetchMaterias(userId)}
        style={styles.refreshButton}
      >
        <Icon name="refresh" size={28} color="#5C1B0F" />
      </TouchableOpacity>
      <FlatList
        data={materias}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
      />
      <View style={styles.button}>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Materias')}>
          <Text style={styles.textoBotao}>Matérias</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5ECD7',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5C1B0F',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  lista: {
    paddingBottom: 20,
  },
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
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B1B2F',
    marginBottom: 6,
    fontFamily: 'serif',
  },
  horario: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'serif',
  },
  academico: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
    fontStyle: 'italic',
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
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
  refreshButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    backgroundColor: '#FFF8DC',
    borderRadius: 20,
    padding: 6,
    elevation: 2,
  },
  
});
