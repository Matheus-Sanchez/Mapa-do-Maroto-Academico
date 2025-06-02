import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const materias = [
    { id: '1', nome: 'Matemática', horario: 'Segunda 08h' },
    { id: '2', nome: 'Português', horario: 'Terça 10h' },
    { id: '3', nome: 'História', horario: 'Quarta 09h' },
    { id: '4', nome: 'Geografia', horario: 'Quinta 11h' },
    { id: '5', nome: 'Física', horario: 'Sexta 07h' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.horario}>{item.horario}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas Matérias</Text>
      <FlatList
        data={materias}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
      />
      <View style={styles.button}>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textoBotao}>Adicionar Matérias</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  lista: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#ffe066',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  horario: {
    fontSize: 14,
    color: '#555',
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
});
