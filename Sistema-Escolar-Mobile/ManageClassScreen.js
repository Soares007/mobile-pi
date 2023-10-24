import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ManageClassScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Tela de Gerenciamento de Turma (Coordenador)</Text>
      {/* Adicione funcionalidades de gerenciamento de turma aqui */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ManageClassScreen;
