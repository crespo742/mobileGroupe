import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useNavigation } from '@react-navigation/native';
import config from '../config/firebase';
import FavButton from '../components/favButton';
import GoBack from '../components/goBack';
import { Share } from 'react-native';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const app = initializeApp(config);
  const auth = getAuth(app);
  const shareContent = () => {
    Share.share({
      message: 'Voici un message à partager !',
    })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

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
    <GoBack onPress={() => navigation.goBack()}/>
      {user && (
        <>
          <Text>Email: {user.email}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Text>Message</Text>
          </TouchableOpacity>
          <FavButton text="deconnexion" onPress={handleSignOut} />
          <Button title="Partager" onPress={shareContent} />
        </>
      )}
    </View>
  );
};

export default Profile;
