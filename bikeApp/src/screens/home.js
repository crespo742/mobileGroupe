import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components';
import Header from '../components/header';
import FavButton from '../components/favButton';
import CustomButton from '../components/customButton';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import Notifee from '@notifee/react-native';
import Toast from 'react-native-toast-message';
import { onAuthStateChanged } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import i18n from '../config/i18n';


const Home = props => {

  const [bikes, setBikes] = useState([]);
  const [make, setMake] = useState('');
  const [url, setUrl] = useState(`https://api.api-ninjas.com/v1/motorcycles?make=${make}`);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  useFocusEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
        if (!onAuthStateChanged) {
          props.navigation.navigate('Login');
        }
      })
      .catch(err => {
        console.log('🚀 ~ file: home.js:6 ~ Home ~ err', err);
      });
  });

  useEffect(() => {
    axios({
      method: "GET",
      url,
      headers: { 'X-Api-Key': 'f5W7nasxrAW6GVNKvJHyEg==dml17MunnVzfVATf' },
    }).then((res) => {
      setBikes(prevState => [...prevState, ...res.data]);
    }).catch(error => {
      console.log(error);
    });
  }, [url]);


  const handleNavigation = page => {
    props.navigation.navigate(page);
  };

  const BikeRow = ({ make, model, year, power }) => {

    const storeData = async (make, model, year, power) => {
      const existingData = await AsyncStorage.getItem('@model');
      const data = existingData ? JSON.parse(existingData) : [];
      const newData = [...data, { make, model, year, power }];
      const jsonValue = JSON.stringify(newData);
      await AsyncStorage.setItem('@model', jsonValue);

      Toast.show({
        type: 'success',
        text1: 'Bike added to favorites',
        text2: `${make} - ${model} - ${year}- ${power}`,
      });

      await Notifee.createChannel({
        id: 'favorites',
        name: 'Favorites',
      });
      await Notifee.displayNotification({
        title: 'Bike added to favorites',
        body: `${make} - ${model} - ${year}- ${power}`,
        android: {
          channelId: 'favorites',
        },
      });
    };

    return (
      <Wrapper>
        <StyledText>
          {make} - {model} - {year}- {power}
        </StyledText>
        <Container onPress={() => storeData(make, model, year, power)}>
          <Image
            style={{ width: 20, height: 20 }}
            source={require('../assets/heart.png')}
          />
        </Container>
      </Wrapper>
    );
  };

  const handleButtonClick = make => {
    setMake(make);
    setUrl(`https://api.api-ninjas.com/v1/motorcycles?make=${make}`);
    setBikes([]);
  };

  return (
    <BigView>
      <Header/>
      <Wrapper>
        <FavButton text={t('favorites')} onPress={() => handleNavigation('Favoris')} />
      </Wrapper>
      <Wrapper>
        <CustomButton text="Honda" onPress={() => handleButtonClick('Honda')} />
        <CustomButton text="Yamaha" onPress={() => handleButtonClick('Yamaha')} />
        <CustomButton text="Kawasaki" onPress={() => handleButtonClick('Kawasaki')} />
        <CustomButton text="Suzuki" onPress={() => handleButtonClick('Suzuki')} />
        <CustomButton text="Ktm" onPress={() => handleButtonClick('Ktm')} />
        <CustomButton text="Ducati" onPress={() => handleButtonClick('Ducati')} />
        <CustomButton text="Bmw" onPress={() => handleButtonClick('Bmw')} />
      </Wrapper>
      <FlatList
        data={bikes}
        renderItem={({ item }) => (
          <BikeRow
            make={item.make}
            model={item.model}
            year={item.year}
            power={item.power}
          />
        )}
        keyExtractor={item => item.id}
      />
    </BigView>
  );
};

const StyledText = styled.Text`
  color: ${props => props.theme.textColor};
`;

const Wrapper = styled.Text`
  background-color: ${props => props.theme.backgroundColor};
`;
const BigView = styled.View`
  background-color: ${props => props.theme.backgroundColor};
`;

const Container = styled.TouchableOpacity``;

export default Home;