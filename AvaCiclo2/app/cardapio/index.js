import React from 'react';
import  {TouchableOpacity}  from 'react-native';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import jsonData from '../../data/db.json'
import {Link} from 'expo-router'

const menuItems = jsonData.produtos;


const MenuItem = ({ item }) => (

  <TouchableOpacity>
    <Link href = {{ pathname: `/p${item.id}/${item.id}`, params: {item : JSON.stringify(item)}}}>
      <View style={styles.menuItem}>
        <Image source={item.url} style={styles.itemImage} />
        <Text style={styles.itemName}>{item.nome}</Text>
        <Text style={styles.itemPrice}>R$ {item.preco.toFixed(2)}</Text>
      </View>
    </Link>
  </TouchableOpacity>
  
);

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cardápio</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  menuItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 8,
    borderRadius: 8,
    width: 150, // Largura de cada item no carrossel
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // para imagens redondas, ajuste conforme necessário
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;