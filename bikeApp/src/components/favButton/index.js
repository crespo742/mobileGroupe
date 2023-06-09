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
  background-color: ${props => props.theme.textColor};
  border: 1px solid ${props => props.theme.backgroundColor};
  padding: 10px;
  border-radius: 5px;
  width:150px;
  height:40px;
  left:220px;
  margin-bottom:15px;
  margin-top:15px;
`;

const StyledText = styled.Text`
  color: ${props => props.theme.backgroundColor};
  text-align:center;
`;

export default FavButton;