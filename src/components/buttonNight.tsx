import React from 'react';
import styled from 'styled-components';

interface SwitchToggleProps {
  theme: 'light' | 'dark';
}

interface ThemeToggleSwitchProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 3.75em;
  height: 2.125em;
`;

const SwitchToggle = styled.span<SwitchToggleProps>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => (props.theme === 'light' ? '#ccc' : '#135846')};
  border-radius: 2.125em;

  &::before {
    position: absolute;
    content: '';
    height: 1.625em;
    width: 1.625em;
    left: 0.25em;
    bottom: 0.25em;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${(props) => (props.theme === 'light' ? 'translateX(0)' : 'translateX(26px)')};
  }
`;

const ThemeToggleSwitch: React.FC<ThemeToggleSwitchProps> = ({ isDarkMode, onToggle }) => {
  return (
    <SwitchContainer onClick={onToggle}>
      <SwitchToggle theme={isDarkMode ? 'dark' : 'light'} />
    </SwitchContainer>
  );
};

export default ThemeToggleSwitch;
