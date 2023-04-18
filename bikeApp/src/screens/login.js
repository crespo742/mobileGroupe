import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import config from '../config/firebase';
import styled from 'styled-components';

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
    <StyledView>
      <StyledText>Login Page</StyledText>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={login}>
        <StyledText>Login</StyledText>
      </TouchableOpacity>
      {error !== '' && <Text>{error}</Text>}
    </StyledView>
  );
};

const StyledView = styled.View`
  background-color: ${props => props.theme.backgroundColor};
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  color: ${props => props.theme.textColor};
`;

export default Login;
