import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import {Link} from 'expo-router'


const ButtonComponente = ({label ,rota}) => {

  return (

    <Link href= {{ pathname: "/[path]", params: {path : rota}}}>
        <Text>
          {label}
        </Text>
    </Link>
    
    

  );
};

export default ButtonComponente;
