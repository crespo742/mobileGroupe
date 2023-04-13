import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components';
import Header from '../components/header';
import SupprButton from '../components/supprButton';
import GoBack from '../components/goBack';
import { useNavigation } from '@react-navigation/native';

const Favoris = (props) => {
  
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const result = await AsyncStorage.getItem('@model');
      if (result !== null) {
        setFavorites(JSON.parse(result));
      }
    }
    fetchData();
  }, []);

  const handleDeleteFavorite = async (index) => {
    const newFavorites = [...favorites];
    newFavorites.splice(index, 1);
    setFavorites(newFavorites);
    await AsyncStorage.setItem('@model', JSON.stringify(newFavorites));
  }

  const renderItem = ({ item, index }) => (
    <View>
      <StyledText>{item.make}</StyledText>
      <StyledText>{item.model}</StyledText>
      <StyledText>{item.year}</StyledText>
      <StyledText>{item.power}</StyledText>
      <SupprButton text="Supprimer" onPress={() => handleDeleteFavorite(index)} />
    </View>
  );

  return (
    <View>
      <Header/>
      <GoBack onPress={() => navigation.goBack()}/>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const StyledText = styled.Text`
  text-align:center;
`;

export default Favoris;