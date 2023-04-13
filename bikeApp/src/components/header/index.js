import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  const handleNavigation = page => {
    navigation.navigate(page);
  };

  return (
    <Wrapper>
      <TouchableOpacity onPress={() => handleNavigation('Home')}>
        <Logo
          style={{ width: 70, height: 70 }}
          source={require('../../assets/yam.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Login')}>
        <Login
          style={{ width: 30, height: 30 }}
          source={require('../../assets/login.png')}
        />
      </TouchableOpacity>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  display:flex;
  align-items:center;
  flex-direction: row;
  justify-content:space-between;
  background-color:white;
  height:90px;
`;

const Logo = styled.Image`
  left:10px;
`;

const Login = styled.Image`
  right:20px;
`;

export default Header;