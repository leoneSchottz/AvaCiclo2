import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import {Link} from 'expo-router'
import ButtonComponente from '../componentes/Botao'

const Home = () => {
  return (
    <View style={styles.container}>

      <ButtonComponente label='Menu' rota='cardapio' />

    </View>
    

  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
  },
});

export default Home;
