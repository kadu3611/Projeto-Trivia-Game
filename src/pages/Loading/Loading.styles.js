import styled, { keyframes } from 'styled-components';

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

export const Dot = styled.div`

  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: black;
  color: black; 
  /* Animation */
  animation: ${BounceAnimation} 0.8s linear infinite;
  animation-delay: ${(props) => props.delay};


`;

export const DivLoading = styled.div`
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black; 
`;

export const DotWrapper = styled.div`
font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 150px;
    padding-bottom: 320px;
    color: black; 
`;
