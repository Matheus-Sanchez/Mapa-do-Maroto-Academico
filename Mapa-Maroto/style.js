import { StyleSheet } from 'react-native';

// Definição das paletas de cores
export const themes = {
  light: {
    primary: '#5C1B0F',      // Marrom (cor principal)
    secondary: '#D4AF37',    // Dourado
    background: '#F5ECD7',   // Bege claro
    card: '#FFF8DC',         // Cor de fundo dos cards
    cardBorder: '#D4AF37',   // Borda dos cards
    text: '#333333',         // Texto principal
    textSecondary: '#666666',// Texto secundário
    accent: '#E97132',       // Cor de destaque
    header: '#5C1B0F',       // Cor do cabeçalho
    headerText: '#F5ECD7',   // Texto do cabeçalho
    error: '#B71C1C',        // Cor de erro
    shadow: '#000000',       // Cor das sombras
    modalBg: 'rgba(0, 0, 0, 0.5)', // Fundo do modal
    disabled: '#CCCCCC',     // Elementos desabilitados
    icon: '#5C1B0F',         // Cor dos ícones
    themeIcon: 'wand'        // Ícone para o tema claro (varinha)
  },
  dark: {
    primary: '#7D3A2D',      // Marrom mais claro para o tema escuro
    secondary: '#B58C26',    // Dourado mais escuro
    background: '#2D2015',   // Fundo escuro com tom marrom
    card: '#3D2D1F',         // Cards com tom escuro
    cardBorder: '#B58C26',   // Borda dos cards em dourado escuro
    text: '#E6DBC9',         // Texto principal claro
    textSecondary: '#B0A89B',// Texto secundário mais claro
    accent: '#FF8E53',       // Cor de destaque mais viva
    header: '#3D2118',       // Cabeçalho mais escuro
    headerText: '#F5ECD7',   // Texto do cabeçalho mantido claro
    error: '#CF6679',        // Cor de erro mais visível no tema escuro
    shadow: '#000000',       // Cor das sombras (mantida)
    modalBg: 'rgba(0, 0, 0, 0.7)', // Fundo do modal mais escuro
    disabled: '#555555',     // Elementos desabilitados escuros
    icon: '#B58C26',         // Cor dos ícones em dourado no tema escuro
    themeIcon: 'owl'         // Ícone para o tema escuro (coruja)
  }
};

// Função para gerar estilos baseados no tema atual
export const createThemedStyles = (theme) => StyleSheet.create({
  // Estilos de container e layout
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  header: {
    height: 60,
    backgroundColor: theme.header,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: theme.headerText,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },

  // Estilos de texto
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.primary,
    marginVertical: 15,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  subTitulo: {
    fontSize: 20,
    color: theme.primary,
    marginBottom: 10,
    fontFamily: 'serif',
  },
  texto: {
    fontSize: 16,
    color: theme.text,
    marginBottom: 5,
    fontFamily: 'serif',
  },
  textoSecundario: {
    fontSize: 14,
    color: theme.textSecondary,
    fontStyle: 'italic',
    fontFamily: 'serif',
  },
  link: {
    color: theme.primary,
    textDecorationLine: 'underline',
  },

  // Estilos de cartões e listas
  card: {
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 8,
    fontFamily: 'serif',
  },
  listContainer: {
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.cardBorder,
  },

  // Estilos de input
  input: {
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    color: theme.text,
    fontFamily: 'serif',
  },

  // Estilos de botões
  botao: {
    backgroundColor: theme.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.secondary,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
  },
  botaoSecundario: {
    backgroundColor: 'transparent',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.primary,
  },
  textoBotao: {
    color: theme.headerText,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  textoBotaoSecundario: {
    color: theme.primary,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },

  // Estilos de modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.modalBg,
  },
  modalView: {
    backgroundColor: theme.card,
    borderRadius: 12,
    padding: 20,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
    borderWidth: 1,
    borderColor: theme.cardBorder,
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  
  // Estilos para imagens e mapas
  image: {
    resizeMode: 'contain',
  },
  scrollView: {
    flex: 1,
    backgroundColor: theme.background,
  },

  // Estilos para avisos e notificações
  avisoContainer: {
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  diaAtual: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'serif',
  },
});

// Exportar estilos no tema claro por padrão
export const styles = createThemedStyles(themes.light);