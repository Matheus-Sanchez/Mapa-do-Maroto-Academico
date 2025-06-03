import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes, createThemedStyles } from '../style';

// Criar o contexto de tema
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('light');
  const [isLoading, setIsLoading] = useState(true);

  // Carregar preferência de tema salva
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('themeMode');
        if (savedTheme) {
          setThemeMode(savedTheme);
        } else {
          // Usar tema do dispositivo por padrão
          setThemeMode(deviceTheme === 'dark' ? 'dark' : 'light');
        }
      } catch (error) {
        console.log('Erro ao carregar tema:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTheme();
  }, [deviceTheme]);

  // Alternar entre temas
  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    saveTheme(newTheme);
  };

  // Salvar preferência de tema
  const saveTheme = async (mode) => {
    try {
      await AsyncStorage.setItem('themeMode', mode);
    } catch (error) {
      console.log('Erro ao salvar tema:', error);
    }
  };

  const theme = themes[themeMode];
  const styles = createThemedStyles(theme);
  const themeIcon = theme.themeIcon; // Obtém o ícone baseado no tema atual

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      styles, 
      themeMode, 
      toggleTheme, 
      isLoading,
      themeIcon 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado
export const useTheme = () => useContext(ThemeContext);