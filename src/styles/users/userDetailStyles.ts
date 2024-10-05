import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 2rem;
  background-color: #f7f7f7;
  gap: 1em;
  flex: 1;
`;

export const LeftSection = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 0.75em;
  padding: 2%;
  box-shadow: 0 0.25em 0.375em rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 55vh;
`;

export const RightSection = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 0.75em;
  box-shadow: 0 0.25em 0.375em rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 55vh;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.h1`
  font-size: 1.4em;
  color: #333;
`;

export const UserId = styled.p`
  font-size: 1em;
  color: #888;
`;

export const JobDesk = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5em 0;
`;

export const InfoLabel = styled.p`
  font-size: 1em;
  font-weight: bold;
  color: #333;
`;

export const InfoValue = styled.p`
  font-size: 1em;
  color: #555;
`;

export const ContactInfo = styled.div`
  margin: 0.5em 0;
`;

export const Description = styled.p`
  font-size: 1em;
  color: #666;
  margin: 0.5em 0;
  flex-grow: 1;
  overflow-y: auto;
`;

export const ShortDescription = styled.p`
  font-size: 1.1em;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0.8em;
  border-radius: 0.5em;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const Status = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  color: white;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  font-size: 0.85em;
  text-align: center;
  position: absolute;
  top: 0.8em;
  right: 0.8em;
  z-index: 10;
`;

export const Carousel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.75em;
  position: relative;
  overflow: hidden;
`;

export const FixedWidthImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const CarouselButton = styled.button<{ $position: 'left' | 'right' }>`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 2em;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $position }) => $position}: 1em;
  z-index: 10;
`;