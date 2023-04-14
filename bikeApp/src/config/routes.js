import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import styled from 'styled-components';
import Home from '../screens/home';
import Login from '../screens/login';
import Favoris from '../screens/favoris';
import Register from '../screens/register';
import Profile from '../screens/profile';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <GlobalSafeArea>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Favoris" component={Favoris} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalSafeArea>
  );
};

const GlobalSafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: red;
`;

export default Routes;
