import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

const Login = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    axios({
      method: 'POST',
      url: 'https://login.hikkary.com/users/login',
      data: {
        username: inputs.email,
        password: inputs.password,
      },
    })
      .then(res => {
        AsyncStorage.setItem('token', res.headers['x-access-token'])
          .then(() => {
            navigation.navigate('Home');
          })
          .catch(err => {
            console.log('🚀 ~ file: login.js:6 ~ Login ~ err', err);
          });
      })
      .catch(err => {
        console.log('🚀 ~ file: login.js:6 ~ Login ~ err', err);
      });
  };

  return (
    <Container>
      <TouchableGoBack onPress={() => navigation.goBack()}>
        <StyledText>Go Back</StyledText>
      </TouchableGoBack>
      <Img
        style={{ width: 190, height: 190 }}
        source={require('../assets/yam.png')}
        // source={require('../assets/yam.png')}
      />
      <Wrapper>
        <InputContainer>
          <TextInputStyled
            placeholder="Email"
            value={inputs.email}
            onChangeText={text => setInputs({ ...inputs, email: text })}
          />
        </InputContainer>
        <InputContainer>
          <TextInputStyled
            placeholder="Password"
            value={inputs.password}
            onChangeText={text => setInputs({ ...inputs, password: text })}
          />
        </InputContainer>
        <InputContainer>
          <TouchableLogin onPress={handleLogin}>
            <StyledText>Se connecter</StyledText>
          </TouchableLogin>
        </InputContainer>
      </Wrapper>
    </Container>
  );
};

const InputContainer = styled.View`
  margin: 4px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:115px;
`;

const Wrapper = styled.View`
  top:80px;
`;

const Img = styled.Image`
  left:100px;
  top:50px;
`;

const TextInputStyled = styled.TextInput`
  border:1px solid black;
  width:270px;
  border-radius: 12px;
  padding: 12px;
`;

const TouchableLogin = styled.TouchableOpacity`
  border:1px solid;
  border-radius:5px;
  width:100px;
  height:30px;
  background-color:black;
  justify-content:center;
  align-items:center;
  margin-top:10px;
`;

const TouchableGoBack = styled.TouchableOpacity`
  border:1px solid;
  width:80px;
  height:30px;
  background-color:black;
  justify-content:center;
  align-items:center;
  top:10px;
  left:10px;
  border-radius:5px;
`;

const StyledText = styled.Text`
  color: white;
`;

const Container = styled.View`
  flex: 1;
`;

export default Login;
