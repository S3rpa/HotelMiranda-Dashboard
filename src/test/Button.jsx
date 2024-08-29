import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) => props.color || 'blue'};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Button = ({ color, children }) => {
  return <StyledButton color={color}>{children}</StyledButton>;
};

export default Button;
