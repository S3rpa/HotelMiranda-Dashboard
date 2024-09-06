import { styled } from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  background-color: #f7f7f7;
  color: #333;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const SearchInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 1rem;
`;

export const NewBookingButton = styled.button`
  background-color: #135846;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0a3c29;
  }
`;

export const Tabs = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

export const Tab = styled.button<{ $active: boolean }>`
  background-color: ${(props) => (props.$active ? '#135846' : 'transparent')};
  color: ${(props) => (props.$active ? 'white' : '#333')};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 1rem;

  &:hover {
    background-color: #0a3c29;
    color: white;
  }
`;

export const SpecialRequestPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 400px;
  max-width: 90%;
  color: #333;
  text-align: left;

  h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #135846;
  }

  p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;
