import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useNavigation } from '@react-navigation/native';
import config from '../config/firebase';
import FavButton from '../components/favButton';
import GoBack from '../components/goBack';
import { Share } from 'react-native';
import styled from 'styled-components/native';

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
    <StyledContainer>
      <GoBack onPress={() => navigation.goBack()} />
      {user && (
        <>
          <StyledTitle>Profil</StyledTitle>
          <StyledInfoContainer>
            <StyledInfo>Email:</StyledInfo>
            <StyledInfoText>{user.email}</StyledInfoText>
          </StyledInfoContainer>
          <StyledInfoContainer>
            <StyledInfo>Pseudo:</StyledInfo>
            <StyledInfoText>{user.pseudo}</StyledInfoText>
          </StyledInfoContainer>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <StyledLink>Envoyer un message</StyledLink>
          </TouchableOpacity>
          <FavButton text="Déconnexion" onPress={handleSignOut} />
          <StyledButtonContainer>
            <Button title="Partager" onPress={shareContent} />
          </StyledButtonContainer>
        </>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};
  padding: 20px;
`;

const StyledTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${props => props.theme.textColor};
`;

const StyledInfoContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const StyledInfo = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.textColor};
`;

const StyledInfoText = styled.Text`
  font-size: 16px;
  margin-left: 5px;
  color: ${props => props.theme.textColor};
`;

const StyledLink = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.linkColor};
  margin-bottom: 10px;
`;

const StyledButtonContainer = styled.View`
  margin-top: 20px;
`;

export default Profile;
