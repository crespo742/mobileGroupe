import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const SplashScreen = () => {
  return (
    <Container>
      <Logo
        style={{ width: 150, height: 150 }}
        source={require('../../assets/yam.png')}
      />
      <StyledText>BONYYYOOOUR AMIGO !</StyledText>
    </Container>
  );
};

const StyledText = styled.Text`
  color: ${props => props.theme.textColor};
`;

const Logo = styled.Image`
  color: black;
  text-align:center;
`;

const Container = styled.View`
  background-color: ${props => props.theme.backgroundColor};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default SplashScreen;
