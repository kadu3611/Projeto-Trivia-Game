import styled from 'styled-components';
import background from '../trivia-back-ground.jpg';

// Paleta de core:
// #42b674
// #1276bc
// #a14d92
// #d6df2d

export const ButtonCss = styled.button`
  background-color: ${(props) => (props.disabled ? 'rgb(190 190 190)'
    : '#42b674')};
  border: none;
  color: ${(props) => (props.disabled ? '4CAF80' : 'white')}; 
  padding: 10px 5px 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 200px;
  text-align: center;
  display: inline-block;
  font-size: 15px;

`;
export const SettingCss = styled.button`
  background-color: black;
  border: none;
  color: white; 
  width: 150px;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  box-shadow: 2px 2px 3px rgb(190 190 190);
  `;

export const SectionCss = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: white;
  color: black;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  height: 270px;
  border-radius: 20%;

`;
export const FormCss = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`;

export const InputCSS = styled.input`
  display: flex;
  width: 250px;
  font-size: 20px;
  margin-top: 3px;
  border:0;
  border-bottom:1px solid black;  
  background:transparent;
  padding:8px 30px;
  color:black;
  text-align: center;
  &:focus { 
    border:none;
    outline:none;
    border-bottom:2px solid black;
    background: transparent;
}
&:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 0px white inset;
    transition: background-color 5000s ease-in-out 1s;
}
`;

export const LabelCSS = styled.label`
  font-size: 15px;
  margin-top: 5px;
  text-decoration: solid 1px black;

`;

export const ImgCss = styled.img`
  height: 15vmin;
  padding-bottom: 10px;
  pointer-events: none;
  align-items: center;
  display: flex;
  border-radius: 5%;
  margin-left:auto;
  margin-right:auto;
  `;

export const MainCSS = styled.main`
  background-image:url(${background}) ;
  background-position: center;
  padding-bottom: 275px;
  padding-top: 120px;
  justify-content: center;
  align-items: center;
  `;
