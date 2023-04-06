import React from 'react';
import Routes from './src/config/routes';
import Toast from 'react-native-toast-message';
import { View, Text, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';

const App = () => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  return (
    <>
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItem: 'center',
          },
          isDarkTheme
            ? { backgroundColor: 'black' }
            : { backgroundColor: 'white' },
        ]}>
        <Text style={[isDarkTheme ? { color: 'white' } : { color: 'black' }]}>
          This is demo of default dark/light theme using appearance.{' '}
        </Text>
      </View>
      {/* <Provider store={store}> */}
        <Routes />
        <Toast />
      {/* </Provider> */}
    </>
  );
};

export default App;