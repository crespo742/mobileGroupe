import React from 'react';
import styled from 'styled-components';

const CustomButton = ({ text, onPress }) => {
  return (
    <StyledButton onPress={onPress}>
      <StyledText> {text} </StyledText>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.backgroundColor};
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
  text-align:center;
  margin:2px 4px 2px 4px;
  border: ${props => props.theme.textColor};
`;

const StyledText = styled.Text`
  color: ${props => props.theme.textColor};
`;

export default CustomButton;