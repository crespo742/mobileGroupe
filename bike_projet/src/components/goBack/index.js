import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

const goBack = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Arrow
          style={{ width: 50, height: 50 }}
          source={require('../../assets/arrow.png')}
        />
    </TouchableOpacity>
  );
};

const Arrow = styled.Image`
  color: black;
  text-align:center;
`;

export default goBack;