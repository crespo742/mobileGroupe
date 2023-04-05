// Splash Screen Component
import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

class SplashScreen extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      // Naviguer vers la page d'accueil après 2 secondes
      this.props.navigation.navigate('Home');
    }, 2000);
  }

  render() {
    return (
      <View>
        <Image source={require('./splash-screen-image.png')} />
        {this.props.isLoading && (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }
}

// Reducer
const initialState = {
  isLoading: true,
};

const splashReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'FINISHED_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Connecter le reducer à votre composant de Splash Screen
const mapStateToProps = (state) => ({
  isLoading: state.splashReducer.isLoading,
});

export default connect(mapStateToProps)(SplashScreen);