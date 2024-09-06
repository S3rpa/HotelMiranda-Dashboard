import { styled } from 'styled-components'

export const Container = styled.div`
  padding: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin: 0.5rem 0;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Select = styled.select`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #135846;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0a3c29;
  }
`;
