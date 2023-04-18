import { ThemeProvider } from 'styled-components/native';
import React, { useState, useEffect } from 'react';
import Routes from './src/config/routes';
import Toast from 'react-native-toast-message';
import { useColorScheme } from 'react-native';
import SplashScreen from './src/components/splashScreen';


const App = () => {

  const isDarkMode = useColorScheme() === 'dark';

  const theme = {
    backgroundColor: isDarkMode ? '#1d1d1d' : 'white',
    textColor: isDarkMode ? 'white' : 'black'
  };

  const [splash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 3000); // Afficher le SplashScreen pendant 3 secondes
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        {splash ? (
          <SplashScreen/>
        ) : (
          <>
            <Routes />
            <Toast />
          </>
        )}
      </>
    </ThemeProvider>
  );
};

export default App;