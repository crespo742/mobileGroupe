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
import ShareButton from '../components/shareButton';
import CustomButton from '../components/customButton';
import { useTranslation } from 'react-i18next';
import i18n from '../config/i18n';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const app = initializeApp(config);
  const auth = getAuth(app);

  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');

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
          <StyledTitle>{t('profileTitle')}</StyledTitle>
          <StyledInfoContainer>
            <StyledInfo>{t('emailPlaceholder')}:</StyledInfo>
            <StyledInfoText>{user.email}</StyledInfoText>
          </StyledInfoContainer>
          <StyledInfoContainer>
            <StyledInfo>{t('pseudoPlaceholder')} :</StyledInfo>
            <StyledInfoText>{user.displayName}</StyledInfoText>
          </StyledInfoContainer>
          <CustomButton text={t('sendMessage')} onPress={() => navigation.navigate('Chat')}/>
          <FavButton text={t('logout')} onPress={handleSignOut} />
          <ShareButton text={t('share')} onPress={shareContent} />
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
  color: ${props => props.theme.textColor};
  margin-bottom: 10px;
`;

const SendButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.backgroundColor};
  border: 1px solid ${props => props.theme.backgroundColor};
  padding: 10px;
  border-radius: 5px;
  width:150px;
  height:40px;
  margin-bottom:15px;
  margin-top:15px;
`;

export default Profile;
