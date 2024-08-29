import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';

const ToggleButton = styled.button<{themeMode: 'light' | 'dark'}>`
  border-radius: 0.5em;
  border: none;
  padding: 0.8em;
  padding-inline: 4em;

  ${props => props.themeMode === 'light' ? `
    background: #EBF1EF;
    color: #135846;
    ` : `
    background: #135846;
    color: white;
    `
  }

  &:hover {
    cursor: pointer;
  }
`;

const lightTheme = {
  bodyBackground: '#FFFFFF',
  bodyColor: '#000000',
};

const darkTheme = {
  bodyBackground: '#333333',
  bodyColor: '#FFFFFF',
};

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.body.style.backgroundColor = darkTheme.bodyBackground;
      document.body.style.color = darkTheme.bodyColor;
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.style.backgroundColor = lightTheme.bodyBackground;
      document.body.style.color = lightTheme.bodyColor;
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <ToggleButton themeMode={theme} onClick={toggleTheme}>
        {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
      </ToggleButton>
    </ThemeProvider>
  );
};

export default ThemeToggleButton;
