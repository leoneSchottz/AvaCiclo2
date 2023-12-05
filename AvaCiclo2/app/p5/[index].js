import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from "expo-router";

const ItemDetailsScreen = () => {

  const params = useLocalSearchParams();
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [itemDetails, setItemDetails] = useState({});


  const addToCart = async () => {
    try {
      const currentCart = await AsyncStorage.getItem('cart');
      const cart = currentCart ? JSON.parse(currentCart) : [];
      cart.push(itemDetails);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      Alert.alert('Sucesso', 'Produto adicionado ao carrinho!');
      updateCart(cart);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error.message);
    }
  };

  const updateCart = async (cart) => {
    const total = cart.reduce((acc, item) => acc + item.preco, 0);
    setCartTotal(total);
    setCartItems(cart.map((item) => item.nome));
  };

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cart');
      setCartTotal(0);
      setCartItems([]);
      Alert.alert('Sucesso', 'Carrinho zerado!');
    } catch (error) {
      console.error('Erro ao zerar o carrinho:', error.message);
    }
  };

  useEffect(() => {
    setItemDetails(JSON.parse(params.item))
    const fetchCart = async () => {
      try {
        const currentCart = await AsyncStorage.getItem('cart');
        const cart = currentCart ? JSON.parse(currentCart) : [];
        updateCart(cart);
      } catch (error) {
        console.error('Erro ao buscar o carrinho:', error.message);
      }
    };

    fetchCart();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Item</Text>
      <Text>ID do Item: {itemDetails.id}</Text>
      <Text>Nome: {itemDetails.nome}</Text>
      <Text>Preço: R$ {itemDetails.preco}</Text>
      <Image source={itemDetails.url} style={styles.itemImage} />
      <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
        <Text style={styles.addToCartButtonText}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>
      <Text style={styles.cartTotal}>Total do Carrinho: R$ {cartTotal.toFixed(2)}</Text>
      {cartItems.length > 0 && (
        <ScrollView style={styles.cartItemsScrollView}>
          <Text style={styles.cartItemsTitle}>Itens no Carrinho:</Text>
          {cartItems.map((item, index) => (
            <Text key={index} style={styles.cartItem}>
              {item}
            </Text>
          ))}
        </ScrollView>
      )}
      <TouchableOpacity style={styles.clearCartButton} onPress={clearCart}>
        <Text style={styles.clearCartButtonText}>Zerar Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartTotal: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemsScrollView: {
    marginTop: 16,
    maxHeight: 100, 
  },
  cartItemsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItem: {
    fontSize: 16,
    marginTop: 8,
  },
  clearCartButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  clearCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemImage: {
    width: 150, 
    height: 150, 
    borderRadius: 8,
    marginTop: 16,
  },
});

export default ItemDetailsScreen;
