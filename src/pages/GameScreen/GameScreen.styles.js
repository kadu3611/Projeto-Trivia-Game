import styled from 'styled-components';

// #42b674
// #1276bc
// #a14d92
// #d6df2d

const TWENTY = 20; // MagicNumber
const SEVEN = 10;
const funcColor = ({ children }) => { // Foi colocada em função por ser muito utilizada
  if (children >= TWENTY) {
    return '#42b674';
  } if (children >= SEVEN) {
    return '#d6df2d';
  }
  return '#a14d92';
};

const funcValueColor = ({ value }) => {
  if (value >= TWENTY) {
    return '#42b674';
  } if (value >= SEVEN) {
    return '#d6df2d';
  }
  return '#a14d92';
};

const funcAnswerCorrect = ({ className }) => { // Foi colocada em função por ser muito utilizada
  if (className === 'green') {
    return '3px solid rgb(6, 240, 15)';
  }
  if (className === 'red') {
    return '3px solid red';
  }
  return 'none';
};

export const MainCSS = styled.main`
margin: 0px;
background-size: auto;
padding-bottom: 270px;
`;

export const SectionQuestionsCSS = styled.section`
justify-content: left;
padding-bottom: 15px;
padding-left: 25px;
`;

export const DivCategory = styled.div`
display: block;
padding-bottom: 15px;
`;

export const DivQuestion = styled.div`
display: block;
font-size: 20px;
`;

export const SectionAnswerOptions = styled.section`
display: inline;
justify-content: space-around;
align-items: center;
`;

export const ButtonAnswer = styled.button`
display: inline;
align-items: center;
justify-content: center;
width: 20%;
height: 50px;
font-size: 15px;
border-radius: 2%;
border: ${funcAnswerCorrect};
:hover{
  background-color: #DCDCDC ;
}
`;

export const DivAnswer = styled.div`
display: flex;
justify-content: space-around;
padding-top: 20px;
`;

export const DivNext = styled.div`
display: flex;
justify-content: space-around;
padding-top: 20px;
`;

export const ButtonNext = styled.button`
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  display: inline;
  font-size: 17px;
  letter-spacing: 5px;
  text-transform: uppercase;
  border-radius: 2%;
  border: none;
  :hover{
    background-color:#DCDCDC;
  }

`;

export const DivCSS = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding-bottom: 25px;
color: ${funcColor};

`;

export const HDivCSS = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: auto;
height: auto;

`;

export const ProgressCSS = styled.progress`

display: block;
justify-content: center;
align-items: center;
appearance: none;
padding-top: 4px;
width: 80%;
::-webkit-progress-bar { 
height: 10px;
border-radius: 20px;
background-color: #eee;
}
::-webkit-progress-value { 
height: 10px;
border-radius: 20px;
background-color: ${funcValueColor}
}
`;

/* export const CicleCSS = styled.svg`
animation: rotate 2s linear infinite;
margin: -25px 0 0 -25px;
width: 50px;
height: 50px;
// background-color: lightblue;
// border-radius: 50%;
// stroke-width: 2px;
& .path {
stroke: ${funcValueColor};
stroke-linecap: round;
animation: dash 30s ease-in-out //infinite;
}

@keyframes rotate {
100% {
transform: rotate(360deg);
}
}
@keyframes dash {
0% {
stroke-dasharray: 1, 150;
stroke-dashoffset: 0;
}
50% {
stroke-dasharray: 180, 150;
stroke-dashoffset: -35;
}
100% {
stroke-dasharray: 360, 150;
stroke-dashoffset: -124;
}
}
`; */
