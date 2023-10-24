import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={[styles.container, { backgroundColor: '#ECF9FF' }]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login', { userType: 'Coordenador' })}
      >
        <Text style={styles.buttonText}>Coordenador</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login', { userType: 'Professor' })}
      >
        <Text style={styles.buttonText}>Professor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login', { userType: 'Aluno' })}
      >
        <Text style={styles.buttonText}>Aluno</Text>
      </TouchableOpacity>
    </View>
  );
};

const LoginScreen = ({ route, navigation }) => {
  const { userType } = route.params;
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // Implemente aqui a lógica de autenticação com RM e senha
    // Você pode usar o estado 'rm' e 'senha' para obter os valores dos campos de entrada
    console.log(`Usuario: ${usuario}, Senha: ${senha}`);
    if (userType === 'Coordenador') {
      // Navegar para a tela de opções de gerenciamento se o usuário for um coordenador
      navigation.navigate('ManageOptions');
    } else {
      // Para outros tipos de usuários, navegar para a tela de perfil
      navigation.navigate('Profile', { userType, usuario });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>
        {userType === 'Coordenador' ? 'Olá Coordenador!' : userType === 'Professor' ? 'Olá Professor!' : 'Olá Aluno!'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o Usuário"
        onChangeText={text => setUsuario(text)}
        value={usuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Insira a Senha"
        secureTextEntry={true}
        onChangeText={text => setSenha(text)}
        value={senha}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const ManageOptionsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ManageSchedule')}
      >
        <Text style={styles.buttonText}>Gerenciar Horário</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ManageClass')}
      >
        <Text style={styles.buttonText}>Gerenciar Turma</Text>
      </TouchableOpacity>
    </View>
  );
};

const ManageScheduleScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Tela de Gerenciamento de Horário</Text>
      {/* Adicione funcionalidades de gerenciamento de horário aqui */}
    </View>
  );
};

const ManageClassScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Tela de Gerenciamento de Turma</Text>
      {/* Adicione funcionalidades de gerenciamento de turma aqui */}
    </View>
  );
};

const ProfileScreen = ({ route }) => {
  const { userType, usuario } = route.params;
  return (
    <View style={styles.container}>
      <Text>Bem-vindo, {usuario}!</Text>
      <Text>Tipo de usuário: {userType}</Text>
      {/* Adicione mais informações do perfil do aluno, professor ou coordenador aqui */}
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Escolha o Tipo de Usuário' }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ManageOptions" component={ManageOptionsScreen} options={{ title: 'Opções de Gerenciamento' }} />
        <Stack.Screen name="ManageSchedule" component={ManageScheduleScreen} options={{ title: 'Gerenciar Horário' }} />
        <Stack.Screen name="ManageClass" component={ManageClassScreen} options={{ title: 'Gerenciar Turma' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  greetingText: {
    fontSize: 40,
    marginBottom: 40,
  },
  button: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#B20000',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;
