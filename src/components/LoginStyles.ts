import { styled } from 'styled-components'

  export const colors = {
    primary: '#135846',
    secondary: '#008489',
    background: '#F7F7F7',
    text: '#333333',
    inputBackground: '#FFFFFF',
    borderColor: '#E6E6E6',
  };
  
  export const LoginContainer = styled.div`
    height: 100vh;
    background-color: ${colors.background};
    display: grid;
    place-items: center;
  `;
  
  export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    background-color: ${colors.inputBackground};
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  `;
  
  export const Title = styled.h1`
    color: ${colors.primary};
    margin-bottom: 1rem;
    text-align: center;
  `;
  
  export const Input = styled.input`
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid ${colors.borderColor};
    border-radius: 0.25rem;
    font-size: 1rem;
  `;
  
  export const Button = styled.button`
    padding: 0.75rem;
    background-color: ${colors.primary};
    color: white;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    cursor: pointer;
  
    &:hover {
      background-color: ${colors.secondary};
    }
  `;
  
  export const RegisterLink = styled.a`
    margin-top: 1rem;
    color: ${colors.secondary};
    text-align: center;
    cursor: pointer;
  
    &:hover {
      text-decoration: underline;
    }
  `;
  