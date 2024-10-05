import { styled } from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  background-color: #f7f7f7;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #135846;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0a3c29;
  }
`;