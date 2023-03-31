import React from 'react';
import styled from 'styled-components';

const SupprButton = ({ text, onPress }) => {
  return (
    <StyledButton onPress={onPress}>
      <StyledText> {text} </StyledText>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableOpacity`
  background-color: black;
  padding: 10px;
  border-radius: 5px;
  width:150px;
  height:40px;
  left:130px;
  margin-bottom:25px;
  margin-top:25px;
`;

const StyledText = styled.Text`
  color: white;
  text-align:center;
`;

export default SupprButton;