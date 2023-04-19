import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GoBack from '../components/goBack';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import config from '../config/firebase';
import Geolocation from '@react-native-community/geolocation';

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const app = initializeApp(config);
  const auth = getAuth(app);

  const createUser = () => {
    if (password !== confirmPassword) {
      setError('Les deux mots de passe doivent correspondre');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password, pseudo)
      .then((userCredential) => {
        const user = userCredential.user;
        const db = getDatabase();

        const userRef = ref(db, 'users/' + user.uid);
        const userData = {
          email: email,
          password: password,
          pseudo: pseudo,
        };

        getLocation()
          .then((location) => {
            userData.location = location;
            return set(userRef, userData);
          })
          .then(() => {
            console.log(
              'Utilisateur enregistré avec succès dans la base de données Firebase'
            );
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    });
  };

  return (
    <Container>
      <GoBack onPress={() => navigation.goBack()} />
      <Title>Inscription</Title>
      <Form>
        <Input
          placeholder="Pseudo"
          onChangeText={(text) => setPseudo(text)}
          value={pseudo}
        />
        <Input
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Input
          placeholder="Mot de passe"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Input
          placeholder="Confirmer le mot de passe"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
        />
        {error !== '' && <ErrorText>{error}</ErrorText>}
        <Button onPress={createUser}>
          <ButtonText>Créer un compte</ButtonText>
        </Button>
      </Form>
    </Container>
  );
};



const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
`;

const Form = styled.View`
  margin-top: 40px;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
`;
const ErrorText = styled.Text`
  color: red;
  margin-bottom: 10px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.textColor};
  padding: 15px;
  border-radius: 5px;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.backgroundColor};
  font-weight: bold;
  text-align: center;
`;

export default Register;
 
