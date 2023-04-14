import { TouchableOpacity, Text, TextInput } from 'react-native';
import React from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import { getDatabase, ref, set, get } from "firebase/database";
import { initializeApp } from 'firebase/app';
import config from '../config/firebase';
import { useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import GoBack from '../components/goBack';
import { useNavigation } from '@react-navigation/native';


const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const app = initializeApp(config);
  const auth = getAuth(app);

  const createUser = () => {
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

        getLocation().then(location => {
          userData.location = location;
          return set(userRef, userData);
        }).then(() => {
          console.log('Utilisateur enregistré avec succès dans la base de données Firebase');
        }).catch(error => {
          console.log(error.message);
        });
      })
  }

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        error => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    });
  };

  return (
    <>
      <GoBack onPress={() => navigation.goBack()} />
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
      <TouchableOpacity onPress={createUser}>
        <Text>Create user</Text>
      </TouchableOpacity>
    </>
  );
}

export default Register;
