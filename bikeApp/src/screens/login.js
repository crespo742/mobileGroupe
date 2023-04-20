import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import config from '../config/firebase';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import i18n from '../config/i18n';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const app = initializeApp(config);
  const auth = getAuth(app);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate('Home');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Container>
      <Title>{t('loginTitle')}</Title>
      <Input
        placeholder={t('emailPlaceholder')}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Input
        placeholder={t('passwordPlaceholder')}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
    <StyledView>
      <StyledText1>{t('textToRegister')}</StyledText1>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <StyledText2> {t('linkToRegister')}</StyledText2>
      </TouchableOpacity>
    </StyledView>
      <Button onPress={login}>
        <ButtonText>{t('loginButton')}</ButtonText>
      </Button>
      {error !== '' && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 32px;
  color: ${props => props.theme.textColor};
`;

const Input = styled.TextInput`
  width: 80%;
  height: 48px;
  padding: 12px;
  border-radius: 24px;
  border-width: 1px;
  border-color: #aaaaaa;
  margin-bottom: 16px;
`;

const Button = styled.TouchableOpacity`
  width: 80%;
  height: 48px;
  border-radius: 24px;
  background-color: ${props => props.theme.textColor};
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.backgroundColor};
  font-size: 16px;
  font-weight: bold;
`;

const ErrorMessage = styled.Text`
  color: #ff0000;
  margin-top: 16px;
`;

const StyledView = styled.View`
  background-color: ${props => props.theme.backgroundColor};
  display:flex;
  flex-direction:row;
  align-items: center;
  justify-content: center;
`;

const StyledText1 = styled.Text`
  color: ${props => props.theme.textColor};
`;

const StyledText2 = styled.Text`
  color: ${props => props.theme.textColor};
  font-weight: bold;
`;

export default Login;
