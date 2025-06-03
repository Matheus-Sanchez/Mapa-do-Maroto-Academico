import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../FirebaseConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

export default function HomeScreen({navigation}) {
  const { theme } = useTheme();
  const [materias, setMaterias] = useState([]);
  const [materiasHoje, setMateriasHoje] = useState([]);
  const [userId, setUserId] = useState(null);
  const [diaAtual, setDiaAtual] = useState('');

  useEffect(() => {
    // Obter o dia da semana atual
    const obterDiaSemana = () => {
      const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      const hoje = new Date().getDay();
      return dias[hoje];
    };
    
    setDiaAtual(obterDiaSemana());
    
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUserId(user.uid);
        fetchMaterias(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Filtra as matérias do dia atual quando a lista de matérias for carregada
    if (materias.length > 0) {
      const aulasDeHoje = materias.filter(
        materia => materia.dia && materia.dia.toLowerCase() === diaAtual.toLowerCase()
      );
      setMateriasHoje(aulasDeHoje);
    }
  }, [materias, diaAtual]);

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
    <View style={[styles.item, { 
      backgroundColor: theme.card, 
      borderColor: theme.cardBorder 
    }]}>
      <Text style={[styles.nome, { color: theme.text }]}>{item.materia}</Text>
      <Text style={[styles.horario, { color: theme.text }]}>Sala: {item.salaNumero}{item.salaLetra}</Text>
      <Text style={[styles.academico, { color: theme.textSecondary }]}>Acadêmico: {acharAcademico(item.salaNumero)}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Botão de troca de tema */}
      <View style={styles.themeToggleContainer}>
        <ThemeToggle />
      </View>
      
      <Text style={[styles.titulo, { color: theme.primary }]}>Minhas Matérias</Text>
      
      {/* Aviso de aulas do dia */}
      <View style={[styles.avisoContainer, { 
        backgroundColor: theme.card,
        borderColor: theme.cardBorder
      }]}>
        <Text style={[styles.diaAtual, { color: theme.primary }]}>Hoje é {diaAtual}</Text>
        {materiasHoje.length > 0 ? (
          <>
            <Text style={[styles.avisoTitulo, { color: theme.text }]}>Aulas de hoje:</Text>
            {materiasHoje.map(materia => (
              <View key={materia.id} style={[styles.avisoItem, { 
                borderBottomColor: theme.cardBorder 
              }]}>
                <Icon name="book" size={20} color={theme.icon} />
                <Text style={[styles.avisoTexto, { color: theme.text }]}>
                  {materia.materia} - Sala {materia.salaLetra}{materia.salaNumero}
                </Text>
              </View>
            ))}
          </>
        ) : (
          <Text style={[styles.semAulas, { color: theme.textSecondary }]}>Você não tem aulas hoje!</Text>
        )}
      </View>

      <TouchableOpacity
        onPress={() => userId && fetchMaterias(userId)}
        style={[styles.refreshButton, { backgroundColor: theme.card }]}>
        <Icon name="refresh" size={28} color={theme.icon} />
      </TouchableOpacity>
      
      <FlatList
        data={materias}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
      />
      
      <View style={styles.button}>
        <TouchableOpacity 
          style={[styles.botao, { 
            backgroundColor: theme.primary,
            borderColor: theme.secondary 
          }]} 
          onPress={() => navigation.navigate('Materias')}>
          <Text style={[styles.textoBotao, { color: theme.headerText }]}>Matérias</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  themeToggleContainer: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 10,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  avisoContainer: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  diaAtual: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'serif',
  },
  avisoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'serif',
  },
  avisoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
  },
  avisoTexto: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'serif',
  },
  semAulas: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 5,
    fontFamily: 'serif',
  },
  lista: {
    paddingBottom: 20,
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
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    fontFamily: 'serif',
  },
  horario: {
    fontSize: 16,
    fontFamily: 'serif',
  },
  academico: {
    fontSize: 16,
    marginTop: 4,
    fontStyle: 'italic',
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
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
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  refreshButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    borderRadius: 20,
    padding: 6,
    elevation: 2,
  },
});
