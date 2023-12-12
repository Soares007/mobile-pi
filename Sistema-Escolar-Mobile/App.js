import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity, Alert,  FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';

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
    console.log(`Usuario: ${usuario}, Senha: ${senha}`);
    if (userType === 'Coordenador') {
      navigation.navigate('ManageOptions');
    } else if (userType === 'Aluno') {
      
      navigation.navigate('StudentOptions');
    } else {
    
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
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      ><Text>login</Text></TouchableOpacity>
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

  const daysofweek = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];
  const startTimes = ["13:20", "15:00", "16:00"];
  const endTimes = ["14:50", "15:50", "16:50"];

  
  
  const ManageScheduleScreen = () => {
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState("");
    const [selectedStartTime, setSelectedStartTime] = useState("");
    const [selectedEndTime, setSelectedEndTime] = useState("");
  
    const handleCadastrar = async () => {
      if (!selectedDayOfWeek || !selectedStartTime || !selectedEndTime) {
        return;
      }
  
      const request = {
        daysofweek: selectedDayOfWeek,
        startTime: selectedStartTime,
        endTime: selectedEndTime,
      };
  
      try {
        await fetch("http://localhost:8080/times", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        });
  
        console.log("Schedule created successfully!");
  
        setSelectedDayOfWeek("");
        setSelectedStartTime("");
        setSelectedEndTime("");
      } catch (error) {
        console.error(error);
        
      }
    };
  
    return (
      <View style={styles.container}>
        <Text>Horário Atuais</Text>
  
        <View style={styles.container2}>
          <SelectDropdown
            data={daysofweek}
            onSelect={(selectedItem, index) => {
              setSelectedDayOfWeek(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => selectedItem}
            rowTextForSelection={(item, index) => item}
            buttonText="Selecione o Dia da Semana"
            defaultButtonText="Selecione o Dia da Semana"
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            dropdownIconPosition="right"
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
          />
        </View>
  
        <View style={styles.container2}>
          <SelectDropdown
            data={startTimes}
            onSelect={(selectedItem, index) => {
              setSelectedStartTime(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => selectedItem}
            rowTextForSelection={(item, index) => item}
            buttonText="Selecione o Horário de Início"
            defaultButtonText="Selecione o Horário de Início"
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            dropdownIconPosition="right"
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
          />
        </View>
  
        <View style={styles.container2}>
          <SelectDropdown
            data={endTimes}
            onSelect={(selectedItem, index) => {
              setSelectedEndTime(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => selectedItem}
            rowTextForSelection={(item, index) => item}
            buttonText="Selecione o Horário de Término"
            defaultButtonText="Selecione o Horário de Término"
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            dropdownIconPosition="right"
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      </View>
    );
  };

  // fim do gerenciar horário;

  //começo do gerenciar turma;

const cursos = ['ADS', 'ADM', 'Eventos'];
const semestres = ['1° Semestre', '2° Semestre', '3° Semestre', '4° Semestre'];
const turnos = ['Matutino', 'Vespertino', 'Noturno'];

const ManageClassScreen = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [students, setStudents] = useState('');
  const handleCadastroTurma = async () => {
    if (!selectedCourse || !selectedSemester || !selectedShift || !students) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course: selectedCourse,
          semester: selectedSemester,
          shift: selectedShift,
          students,
        }),
      });

      if (response.ok) {
        alert('Turma cadastrada com sucesso!');
        setSelectedCourse('');
        setSelectedSemester('');
        setSelectedShift('');
        setStudents('');
      } else {
        const error = await response.text();
        alert(`Erro: ${error}`);
      }
    } catch (error) {
      console.error(error);
      alert('Falha ao cadastrar turma.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Turma</Text>

      <View style={styles.container2}>
        <SelectDropdown
          data={cursos}
          onSelect={(selectedItem) => setSelectedCourse(selectedItem)}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          buttonText="Selecione o Curso"
          defaultButtonText={'Selecione o Curso'}
          buttonStyle={styles.dropdown2BtnStyle}
          buttonTextStyle={styles.dropdown2BtnTxtStyle}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown2DropdownStyle}
          rowStyle={styles.dropdown2RowStyle}
          rowTextStyle={styles.dropdown2RowTxtStyle}
        />
      </View>
      <View style={styles.container2}>
        <SelectDropdown
          data={semestres}
          onSelect={(selectedItem) => setSelectedSemester(selectedItem)}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          buttonText="Selecione o Semestre"
          defaultButtonText={'Selecione o Semestre'}
          buttonStyle={styles.dropdown2BtnStyle}
          buttonTextStyle={styles.dropdown2BtnTxtStyle}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown2DropdownStyle}
          rowStyle={styles.dropdown2RowStyle}
          rowTextStyle={styles.dropdown2RowTxtStyle}
        />
      </View>
      <View style={styles.container2}>
        <SelectDropdown
          data={turnos}
          onSelect={(selectedItem) => setSelectedShift(selectedItem)}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
          buttonText="Selecione o Turno"
          defaultButtonText={'Selecione o Turno'}
          buttonStyle={styles.dropdown2BtnStyle}
          buttonTextStyle={styles.dropdown2BtnTxtStyle}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown2DropdownStyle}
          rowStyle={styles.dropdown2RowStyle}
          rowTextStyle={styles.dropdown2RowTxtStyle}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Insira o Número de alunos"
          keyboardType="numeric"
          value={students}
          onChangeText={(text) => setStudents(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCadastroTurma}>
        <Text style={styles.buttonText}>Cadastrar Turma</Text>
      </TouchableOpacity>
      
    </View>
  );
};

  //fim do gerenciar turma;

  //cadastro de professor;

  const ManageProfessorScreen = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [professors, setProfessors] = useState([]); // Array to store registered professors
  
    const fetchProfessors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/teachers');
        setProfessors(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Falha ao buscar professores.');
      }
    };
  
    const handleViewProfessors = () => {
      fetchProfessors();
    };
  
    const handleCadastrarProfessor = async () => {
      // Implement logic to send data to the backend
      console.log(`Id: ${id}, Name: ${name}, CPF: ${cpf}`);
  
      try {
        await axios.post('http://localhost:8080/teachers', {
          id,
          name,
          cpf,
        });
        Alert.alert('Sucesso', 'Professor cadastrado com sucesso!');
        setId('');
        setName('');
        setCpf('');
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Falha ao cadastrar professor.');
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro de Professor</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          onChangeText={(text) => setCpf(text)}
          value={cpf}
        />
        <View style={{}}>
          <TouchableOpacity style={styles.button} onPress={handleCadastrarProfessor}>
            <Text style={styles.buttonText}>Cadastrar Professor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleViewProfessors}>
            <Text style={styles.buttonText}>Ver Professores</Text>
          </TouchableOpacity>
        </View>
        {professors.length > 0 && (
          <View>
            <Text style={styles.title}>Professores Cadastrados</Text>
            {professors.map((professor) => (
              <Text key={professor.id}>{professor.name} - {professor.cpf}</Text>
            ))}
          </View>
        )}
      </View>
    );
  };

// fim do cadastro de professor;


// cadastrar disciplina;
const ManageDisciplineScreen = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [disciplines, setDisciplines] = useState([]); 

  const fetchDisciplines = async () => {
    try {
      const response = await axios.get('http://localhost:8080/class_subjects');
      setDisciplines(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao carregar disciplinas.');
    }
  };

  const handleVerDisciplinas = async () => {
    await fetchDisciplines();
  };

  const handleDeleteDiscipline = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/class_subjects/${id}`);
      await fetchDisciplines();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao excluir disciplina.');
    }
  };

  
  const handleEditDiscipline = async (id) => {
  };

  const handleCadastrarDiscipline = async () => {
    console.log(`Id: ${id}, Name: ${name}, Description: ${description}`);

    try {
      await axios.post('http://localhost:8080/class_subjects', {
        id,
        name,
        description,
      });
      Alert.alert('Sucesso', 'Disciplina cadastrada com sucesso!');
      setId('');
      setName('');
      setDescription('');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao cadastrar disciplina.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Disciplina</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        onChangeText={(text) => setDescription(text)}
        value={description}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastrarDiscipline}>
        <Text style={styles.buttonText}>Cadastrar Disciplina</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleVerDisciplinas}>
        <Text style={styles.buttonText}>Ver Disciplinas</Text>
      </TouchableOpacity>

     
      {disciplines.map((discipline) => (
        <View key={discipline.id} style={styles.disciplineItem}>
          <Text style={styles.disciplineName}>{discipline.name}</Text>
          <Text style={styles.disciplineDescription}>{discipline.description}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteDiscipline(discipline.id)}
            >
              <Text style={styles.button}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditDiscipline(discipline.id)}
            >
              <Text style={styles.button}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
          
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
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
          
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          
          return item;
        }}
        buttonText="Selecione o Laboratório"
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          title="Reservar"
          onPress={() => {
           
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


//visualizar horário professores
const ViewTeacherScheduleScreen = () => {
  return (
    <View style={styles.container}>
      
      <Text>Tela de Visualização de Horários de Professores</Text>
    </View>
  );
};

//fim visualizar favoritos

const ViewScheduleScreen = () => {
  return (
    <View style={styles.container}>
     
      <Text>Tela de Visualização de Horários</Text>
    </View>
  );
};


//visualizar favoritos
const ViewFavoritesScreen = () => {
  return (
    <View style={styles.container}>
      
      <Text>Tela de Visualização de Favoritos</Text>
    </View>
  );
};

//fim visualizar favoritos

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
  container2: {
    flex: 0.1,
    width: 300,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  selection:
  {
    width:10,
    height:50,
    borderRadius: 5,
    backgroundColor: '#B20000',
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
    width: 50, 
    alignSelf: 'center',
    marginTop: 200,
    
  },
  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},

  dropdown2BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  dropdown3BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: {backgroundColor: 'slategray'},
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },

  dropdown4BtnStyle: {
    width: '50%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown4BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
});

export default App