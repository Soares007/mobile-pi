import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ManageScheduleScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Tela de Gerenciamento de Horário (Coordenador)</Text>
      {/* Adicione funcionalidades de gerenciamento de horário aqui */}
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

export default ManageScheduleScreen;
