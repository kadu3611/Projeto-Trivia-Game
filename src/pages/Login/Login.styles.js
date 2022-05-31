import styled from 'styled-components';
import background from '../trivia-back-ground.jpg';

// Paleta de core:
// #42b674
// #1276bc
// #a14d92
// #d6df2d

export const ButtonCss = styled.button`
  background-color: ${(props) => (props.disabled ? 'rgb(190 190 190)'
    : 'rgb(102 211 7)')};
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
  padding-top: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: auto;

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
  padding:8px 50px;
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
  text-decoration: underline;

`;

export const ImgCss = styled.img`
  padding-bottom: 20px;
  height: 15vmin;
  pointer-events: none;
  align-items: center;
  display: flex;
  `;

export const MainCSS = styled.main`
  width: auto;
  background-image:url(${background}) ;
  padding-bottom: 145px;
  `;
