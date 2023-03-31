import React from 'react';
import styled from 'styled-components';

const FavButton = ({ text, onPress }) => {
  return (
    <StyledButton onPress={onPress}>
      <StyledText> {text} </StyledText>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableOpacity`
  background-color: white;
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
  width:150px;
  height:40px;
  left:230px;
  margin-bottom:15px;
  margin-top:15px;
`;

const StyledText = styled.Text`
  color: black;
  text-align:center;
`;

export default FavButton;