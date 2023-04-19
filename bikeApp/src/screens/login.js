import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import config from '../config/firebase';
import styled from 'styled-components/native';
import GoBack from '../components/goBack';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const app = initializeApp(config);
  const auth = getAuth(app);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Connexion réussie, rediriger vers la page Home
        navigation.navigate('Home');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Container>
      <Title>Login Page</Title>
      <Input
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Input
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
    <StyledView>
      <Text>Vous n'avez pas de compte ?
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <StyledText> Inscrivez-vous ici</StyledText>
      </TouchableOpacity></Text>
    </StyledView>
      <Button onPress={login}>
        <ButtonText>Login</ButtonText>
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
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  color: ${props => props.theme.textColor};
  text-align: center;
  top:4px;
`;



export default Login;
