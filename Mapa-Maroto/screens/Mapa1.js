import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';

export default function Mapa1() {

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/planta-baixa1.jpg')}
      />
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
  
});
