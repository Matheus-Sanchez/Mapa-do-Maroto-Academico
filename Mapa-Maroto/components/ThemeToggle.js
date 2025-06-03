import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { themeMode, toggleTheme } = useTheme();
  
  // Defina a imagem baseada no tema atual
  const themeImage = themeMode === 'dark' 
    ? require('../assets/coruja.jpg') 
    : require('../assets/lumos.png');
  
  // Determinar a cor de fundo do botão baseada no tema
  const buttonBackgroundColor = themeMode === 'dark' ? '#FFF8DC' : '#FFF8DC';
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <View style={[
        styles.imageContainer,
        { backgroundColor: buttonBackgroundColor }
      ]}>
        <Image 
          source={themeImage} 
          style={styles.image} 
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  imageContainer: {
    width: 50,
    height: 50,
    // backgroundColor removido daqui e aplicado dinamicamente
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    padding: 5,
  },
  image: {
    width: 30,
    height: 30,
  }
});

export default ThemeToggle;