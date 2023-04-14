import {TouchableOpacity, Text, TextInput} from 'react-native';
import React from 'react-native';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {firebase} from '@react-native-firebase/auth';
import { getDatabase, ref, set,get } from "firebase/database";
import {initializeApp} from 'firebase/app';
import config from '../config/firebase';
import { useState } from 'react';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const app = initializeApp(config);
  const auth = getAuth(app);

  const test = () => {
    if (password !== confirmPassword) {
      setError('Les deux mots de passe doivent correspondre');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      const db = getDatabase();
      
      const userRef = ref(db, 'users/' + user.uid);
      const userData = {
        email: email,
        password: password,
      };
      return set(userRef, userData);
    })
    .then(() => {
      console.log('Utilisateur enregistré avec succès dans la base de données Firebase');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  }

  return (
    <>
      <TextInput
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={text => setConfirmPassword(text)}
        value={confirmPassword}
      />
      {error !== '' && <Text>{error}</Text>}
      <TouchableOpacity onPress={test}>
        <Text>Create user</Text>
      </TouchableOpacity>
    </>
  );
}

export default Register;
