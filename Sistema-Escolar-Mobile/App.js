import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectDropdown from 'react-native-select-dropdown'

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
    } else if (userType === 'Aluno') {
      // Navegar para a tela de opções de visualização para o usuário Aluno
      navigation.navigate('StudentOptions');
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ManageProfessor')}
      >
        <Text style={styles.buttonText}>Gerenciar Professores</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ManageDiscipline')}
      >
        <Text style={styles.buttonText}>Gerenciar Disciplina</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ReserveRoom')}
      >
        <Text style={styles.buttonText}>Reservar Sala e Laboratório</Text>
      </TouchableOpacity>
    </View>
  );
};

  // começo gerenciar horário;

const diasDaSemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];
const horarios = ["13:20 - 14:50 ocupado por matemática", "15:00 - 15:50 ocupado por matemática", "16:00 - 16:50 ocupado por banco de dados"];

const ManageScheduleScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Horário Atuais</Text>

      <SelectDropdown
        data={diasDaSemana}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        buttonText="Selecione o Dia da Semana"
      />

      <SelectDropdown
        data={horarios}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        buttonText="Selecione o Horário"
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          title="Fazer alteração"
          onPress={() => {
            // Handle button press action
          }}
        />

        <Button
          title="Excluir"
          onPress={() => {
            // Handle button press action
          }}
          color="red"
        />
      </View>
    </View>
  );
};

  // fim do gerenciar horário;

  //começo do gerenciar turma;

const cursos = ["ADS", "ADM", "Eventos"];
const semestres = ["1° Semestre", "2° Semestre", "3° Semestre", "4° Semestre"];
const turnos = ["Matutino", "Vespertino", "Noturno"];

const ManageClassScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Gerenciar Turma</Text>

      <SelectDropdown
        data={cursos}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        buttonText="Selecione o Curso"
      />

      <SelectDropdown
        data={semestres}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        buttonText="Selecione o Semestre"
      />

      <SelectDropdown
        data={turnos}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        buttonText="Selecione o Turno"
      />

      <Button
        title="Fazer alteração"
        onPress={() => {
          // Handle button press action
        }}
      />
    </View>
  );
};

  //fim do gerenciar turma;

  //cadastro de professor;

const ManageProfessorScreen = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [disciplina, setDisciplina] = useState('');

  const handleCadastrarProfessor = () => {
    // Implemente aqui a lógica para cadastrar o professor
    console.log(`Nome: ${nome}, CPF: ${cpf}, Email: ${email}, Disciplina: ${disciplina}`);
    // Adicione a lógica para enviar os dados para o backend ou realizar o cadastro no aplicativo
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Professor</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={(text) => setNome(text)}
        value={nome}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        onChangeText={(text) => setCpf(text)}
        value={cpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Disciplina"
        onChangeText={(text) => setDisciplina(text)}
        value={disciplina}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastrarProfessor}>
        <Text style={styles.buttonText}>Cadastrar Professor</Text>
      </TouchableOpacity>
    </View>
  );
};

// fim do cadastro de professor;


// cadastrar disciplina;

const ManageDisciplineScreen = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [id, setId] = useState('');
  const [nomeDisciplina, setNomeDisciplina] = useState('');
  const [nomeProfessor, setNomeProfessor] = useState('');
  const [horario, setHorario] = useState('');
  const [dia, setDia] = useState('');

  const handleCadastrarDisciplina = () => {
    // Implemente aqui a lógica para cadastrar a disciplina
    const novaDisciplina = {
      id,
      nomeDisciplina,
      nomeProfessor,
      horario,
      dia,
    };

    setDisciplinas([...disciplinas, novaDisciplina]);

    // Limpa os campos após o cadastro
    setId('');
    setNomeDisciplina('');
    setNomeProfessor('');
    setHorario('');
    setDia('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Disciplina</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        onChangeText={(text) => setId(text)}
        value={id}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome da Disciplina"
        onChangeText={(text) => setNomeDisciplina(text)}
        value={nomeDisciplina}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome do Professor"
        onChangeText={(text) => setNomeProfessor(text)}
        value={nomeProfessor}
      />
      <TextInput
        style={styles.input}
        placeholder="Horário"
        onChangeText={(text) => setHorario(text)}
        value={horario}
      />
      <TextInput
        style={styles.input}
        placeholder="Dia"
        onChangeText={(text) => setDia(text)}
        value={dia}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastrarDisciplina}>
        <Text style={styles.buttonText}>Cadastrar Disciplina</Text>
      </TouchableOpacity>

      {/* Tabela de Disciplinas Cadastradas */}
      <View style={styles.tableContainer}>
        <Text style={styles.tableHeader}>Disciplinas Cadastradas</Text>
        <View style={styles.tableRow}>
          <Text>ID</Text>
          <Text>Disciplina</Text>
          <Text>Professor</Text>
          <Text>Horário</Text>
          <Text>Dia</Text>
        </View>
        {disciplinas.map((disciplina, index) => (
          <View style={styles.tableRow} key={index}>
            <Text>{disciplina.id}</Text>
            <Text>{disciplina.nomeDisciplina}</Text>
            <Text>{disciplina.nomeProfessor}</Text>
            <Text>{disciplina.horario}</Text>
            <Text>{disciplina.dia}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

//fim do cadastro de disciplina;

// reserva de sala e lab;

const salas = ["Sala 1", "Sala 2", "Sala 3"];
const laboratorios = ["Lab 1", "Lab 2", "Lab 3"];

const ReserveRoomScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Tela de Reserva de Sala e Laboratório</Text>

      <SelectDropdown
        data={salas}
        onSelect={(selectedItem, index) => {
          if (selectedItem === "Sala 2" || selectedItem === "Sala 3") {
            alert("Essa sala já está reservada");
          } else {
            console.log(selectedItem, index);
          }
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        buttonText="Selecione a Sala"
      />

      <SelectDropdown
        data={laboratorios}
        onSelect={(selectedItem, index) => {
          if (selectedItem === "Lab 3") {
            alert("Esse laboratório já está reservado");
          } else {
            console.log(selectedItem, index);
          }
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        buttonText="Selecione o Laboratório"
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          title="Reservar"
          onPress={() => {
            // Handle button press action
          }}
        />
      </View>
    </View>
  );
};

//fim reserva sala e lab;

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


//opções alunos;
const StudentOptionsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ViewTeacherSchedule')}
      >
        <Text style={styles.buttonText}>Visualizar Horários de Professor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ViewSchedule')}
      >
        <Text style={styles.buttonText}>Visualizar Horários</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ViewFavorites')}
      >
        <Text style={styles.buttonText}>Visualizar Favoritos</Text>
      </TouchableOpacity>
    </View>
  );
};

//fim opções alunos;



const ViewTeacherScheduleScreen = () => {
  return (
    <View style={styles.container}>
      {/* Adicione funcionalidades de visualização de horários de professores aqui */}
      <Text>Tela de Visualização de Horários de Professores</Text>
    </View>
  );
};

const ViewScheduleScreen = () => {
  return (
    <View style={styles.container}>
      {/* Adicione funcionalidades de visualização de horários aqui */}
      <Text>Tela de Visualização de Horários</Text>
    </View>
  );
};

const ViewFavoritesScreen = () => {
  return (
    <View style={styles.container}>
      {/* Adicione funcionalidades de visualização de favoritos aqui */}
      <Text>Tela de Visualização de Favoritos</Text>
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
        <Stack.Screen name="ManageProfessor" component={ManageProfessorScreen} options={{ title: 'Gerenciar Professor' }} />
        <Stack.Screen name="ManageDiscipline" component={ManageDisciplineScreen} options={{ title: 'Gerenciar Disciplina' }} />
        <Stack.Screen name="ReserveRoom" component={ReserveRoomScreen} options={{ title: 'Reservar Sala e Laboratório' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
        <Stack.Screen name="StudentOptions" component={StudentOptionsScreen} options={{ title: 'Opções do Aluno' }} />
        <Stack.Screen name="ViewTeacherSchedule" component={ViewTeacherScheduleScreen} options={{ title: 'Horários de Professores' }} />
        <Stack.Screen name="ViewSchedule" component={ViewScheduleScreen} options={{ title: 'Horários' }} />
        <Stack.Screen name="ViewFavorites" component={ViewFavoritesScreen} options={{ title: 'Favoritos' }} />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tableContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownContainer: {
    width: 50, // Adjust width as needed
    alignSelf: 'center', // Center the dropdown
    marginTop: 200, // Move the dropdown slightly higher
    
  },
});

export default App
