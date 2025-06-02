import { View, Text, StyleSheet, Switch, Image, useColorScheme, useWindowDimensions } from 'react-native';
import react, {useState} from 'react'

import {styles} from './styles';

export default function Header() {

  return (
    <View style={styles.header}>
    <Image
      source={{uri:'https://img.freepik.com/vetores-gratis/pizza-slice-felted-floating-cartoon-vector-icon-ilustracao-icon-objeto-alimentar-vector-plano-isolado_138676-10422.jpg?t=st=1745277964~exp=1745281564~hmac=ad5e2e81bbd73ac4a0264352c87c93dec704bff2d251f87b673189f6f5b94747&w=826'}}
      style={{height: 60, width: 60, resizeMode:'contain', margin: 5}}
    />
      <Text style={{fontSize: 24, color: 'white', alignContent:'center'}} >
        Pizzaria
      </Text>
    </View>
  );
}
