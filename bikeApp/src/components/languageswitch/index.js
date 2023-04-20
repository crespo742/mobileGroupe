import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => changeLanguage(currentLanguage === 'en' ? 'fr' : 'en')} style={styles.button}>
        <Text style={styles.text}>{currentLanguage === 'en' ? 'FR' : 'EN'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default Index;
