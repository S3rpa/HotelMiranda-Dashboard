import { styled } from 'styled-components'

export const Container = styled.div`
  padding: 2rem;
  background-color: #f7f7f7;
  h2{
    color: #333;
    }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Label = styled.label`
  margin: 0.5rem 0;
  font-weight: bold;
  color: #333;
`
export const h2 = styled.h2`
  color: ;
`

export const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
`

export const Select = styled.select`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
`

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
`
