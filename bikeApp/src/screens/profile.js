import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useNavigation } from '@react-navigation/native';
import config from '../config/firebase';
import FavButton from '../components/favButton';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const app = initializeApp(config);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.navigate('Login');
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <View>
      {user && (
        <>
          <Text>Email: {user.email}</Text>
          <FavButton text="deconnexion" onPress={handleSignOut} />
        </>
      )}
    </View>
  );
};

export default Profile;
