import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';



const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  return (
    <Container>
      <Button onPress={() => changeLanguage(currentLanguage === 'en' ? 'fr' : 'en')}>
        <ButtonText>{currentLanguage === 'en' ? 'FR' : 'EN'}</ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-vertical: 10px;
`;

const Button = styled.TouchableOpacity`
  padding-horizontal: 10px;
  padding-vertical: 5px;
  border-radius: 5px;
  margin-horizontal: 5px;
  border-width: 1px;
  border-color: #ccc;
`;

const ButtonText = styled.Text`
  font-weight: bold;
`;

export default Index;
