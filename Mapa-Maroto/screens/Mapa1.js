import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';

export default function Mapa1() {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      maximumZoomScale={4}
      minimumZoomScale={1}
      bouncesZoom={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal={true}
    >
      <ScrollView
        contentContainerStyle={styles.innerContainer}
        maximumZoomScale={4}
        minimumZoomScale={1}
        bouncesZoom={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require('../assets/academico1.jpeg')}
          style={styles.image}
        />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 1200, // coloque a largura real da imagem aqui ou aumente se necessário
    height: 1200, // idem
    resizeMode: 'contain',
  },
});
