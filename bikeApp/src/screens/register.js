import {TouchableOpacity, Text} from 'react-native';
import React from 'react-native';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {firebase} from '@react-native-firebase/auth';
import { getDatabase, ref, set,get } from "firebase/database";
import {initializeApp} from 'firebase/app';
import config from '../config/firebase';

const Register = () => {

  const app = initializeApp(config);
  const auth = getAuth(app);

  const test = () => {
    createUserWithEmailAndPassword(auth, 'ml@mal.com', 'inputs.password')
    .then(userCredential => {
      const user = userCredential.user;
      const db = getDatabase();
      
      const userRef = ref(db, 'users/' + user.uid);
      const userData = {
        email: 'user.email',
        displayName: 'user.displayName',
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
    <TouchableOpacity onPress={test}>
        <Text>Create user</Text>
      </TouchableOpacity>
  </>
);
}

export default Register;
