import React from 'react';
import styled from 'styled-components';

const ShareButton = ({ text, onPress }) => {
  return (
    <StyledButton onPress={onPress}>
      <StyledText> {text} </StyledText>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.textColor};
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
  width:350px;
  height:40px;
  margin-bottom:15px;
  margin-top:15px;
  border: ${props => props.theme.backgroundColor};
`;

const StyledText = styled.Text`
  color: ${props => props.theme.backgroundColor};
  text-align:center;
`;

export default ShareButton;