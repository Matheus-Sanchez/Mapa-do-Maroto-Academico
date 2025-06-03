📍 Mapa do Maroto Acadêmico
Repositório: https://github.com/Matheus-Sanchez/Mapa-do-Maroto-Academico

💡 Ideia
O Mapa do Maroto Acadêmico surgiu da necessidade de estudantes universitários de organizarem suas atividades acadêmicas de forma eficiente. Muitos enfrentam desafios para gerenciar horários de aulas e de se localizarem em ambientes escolares grandes. Este aplicativo foi idealizado para centralizar essas informações em uma única plataforma, proporcionando uma gestão de tempo mais eficaz e contribuindo para o sucesso acadêmico dos usuários.

🎯 Objetivo
Desenvolver um aplicativo móvel que permita aos estudantes universitários:

Registrar e visualizar suas disciplinas.

Se localizar no espaço academico, verificando onde será a aula do dia.

O objetivo é proporcionar uma solução prática e acessível para a organização da rotina acadêmica, contribuindo para a melhoria do desempenho dos estudantes.

🔧 Funcionalidades
Cadastro de Disciplinas: Permite ao usuário registrar as disciplinas cursadas no semestre, incluindo nome, código e horários.

Visualização diaria: Exibe os dias das aulas de forma clara e organizada.

Gerenciamento de Matérias: O usuário pode adicionar, editar e excluir disciplinas.

Autenticação de Usuários: Utiliza o Firebase Authentication para login e registro de usuários, garantindo segurança e personalização.

Armazenamento de Dados: Utiliza o Firebase Firestore para armazenar informações de usuários e disciplinas, permitindo sincronização em tempo real entre dispositivos.

🛠️ Ferramentas Utilizadas
React Native: Framework para desenvolvimento de aplicativos móveis nativos utilizando JavaScript.

Expo: Plataforma que facilita o desenvolvimento, construção e implantação de aplicativos React Native.

Firebase: Plataforma do Google que oferece serviços de backend, incluindo autenticação de usuários e banco de dados em tempo real.

React Navigation: Biblioteca para navegação entre telas no React Native.

Rect Native Icons: Biblioteca para ter acesso a icons compativeis com o react native.

🛠️ Como Executar o Projeto
Para rodar o projeto localmente, siga os passos abaixo:

Clonar o Repositório
	git clone https://github.com/Matheus-Sanchez/Mapa-do-Maroto-Academico.git
	cd Mapa-do-Maroto-Academico
Instalar Dependências

	npm install
	npx expo install react-dom react-native-web @expo/metro-runtime
	npx expo install react-native-screens react-native-safe-area-context
	npm install @react-navigation/native @react-navigation/native-stack @react-navigation/drawer @react-navigation/bottom-tabs
	npm uninstall @react-native-firebase/app @react-native-firebase/auth
	npm install firebase @react-native-async-storage/async-storage
	rm -rf node_modules package-lock.json
	npx expo start -c


📄 Estrutura de Diretórios
'
	MAPA-MAROTO/
	├── assets/                         # Recursos estáticos como imagens e ícones.
	│
	├── components/                     # Componentes reutilizáveis da interface.
	│   ├── Footer.js                   # Rodapé da aplicação.
	│   ├── Header.js                   # Cabeçalho da aplicação.
	│   ├── LogOut.js                   # Botão/componente de logout.
	│   ├── styles.js                   # Estilos compartilhados.
	│   └── ThemeToggle.js              # Alternância entre temas claro/escuro.
	│
	├── context/                        # Gerenciamento de estado global com React Context.
	│   ├── auth/                       # Contexto de autenticação.
	│   │   ├── AuthContext.js          # Define o contexto de autenticação.
	│   │   ├── AuthProvider.js         # Provedor do contexto.
	│   │   └── useAuth.js              # Hook personalizado para acesso ao auth.
	│   └── ThemeContext.js             # Contexto para alternar o tema da aplicação.
	│
	├── navigation/                     # Navegação entre telas.
	│   ├── BottomTabs_Mapa.js         # Navegação por abas inferiores.
	│   └── Drawer_Sobre.js            # Navegação do tipo gaveta (menu lateral).
	│
	├── screens/                        # Telas principais do app.
	│   ├── Login.js                   # Tela de login do usuário.
	│   ├── Mapa1.js                   # Primeira tela do mapa.
	│   ├── Mapa2.js                   # Segunda tela do mapa.
	│   ├── MateriasScreen.js          # Tela com as matérias/disciplina.
	│   └── TelaInicial.js             # Tela inicial/boas-vindas.
	│
	├── App.js                          # Componente raiz da aplicação.
	├── app.json                        # Configuração do projeto Expo.
	├── FirebaseConfig.js               # Integração com Firebase.
	├── index.js                        # Ponto de entrada da aplicação.
	├──	metro.config.js                 # Configuração do bundler Metro.
	├── package-lock.json               # Lockfile do npm.
	├── package.json                    # Dependências e scripts do projeto.
	├── README.md                       # Documentação principal.
	└── style.js                        # Estilos globais.
'


assets/: Contém imagens e outros recursos estáticos.

components/: Componentes reutilizáveis da interface.

firebaseConfig.js: Arquivo com as configurações do Firebase.

navigation/: Contém os arquivos de navegação do aplicativo.

screens/: Telas principais da aplicação.

App.js: Arquivo principal que inicializa o aplicativo.

📌 Contribuições
Contribuições são bem-vindas! Para contribuir com o projeto:

Faça um fork do repositório.

Crie uma branch para sua feature (git checkout -b feature/nova-feature).

Faça commit das suas alterações (git commit -am 'Adiciona nova feature').

Envie para o branch principal (git push origin feature/nova-feature).

Abra um Pull Request.

📬 Contato
Para dúvidas ou sugestões, entre em contato com o autor:

Nome: Matheus Sanchez Duda
	  Giovanna Paiva Alves

Email: matheus.sduda@senacsp.edu.br
	   giovanna.palves@senacsp.edu.br