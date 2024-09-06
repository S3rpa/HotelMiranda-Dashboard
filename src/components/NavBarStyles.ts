import { styled } from 'styled-components'

export const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #FF385C;
  }
`;

export const PageTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

export const PageTitle = styled.div`
  font-size: 1.2rem;
  color: #333;
  margin-left: 0.5rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;