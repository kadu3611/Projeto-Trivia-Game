import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { createPlayer } from '../redux/actions';
import { getToken, saveToken } from '../services/localStorage';
import logo from './trivia.png';
import background from './trivia-back-ground.jpg';

const BotaoCss = styled.button`
    background-color: ${(props) => (props.disabled ? 'rgb(190 190 190)'
    : 'rgb(102 211 7)')};
    // rgb(150 210 90) Green
    ${(props) => console.log(props)}
    border: none;
    color: ${(props) => (props.disabled ? '4CAF80' : 'white')}; 
    padding: 10px 5px 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 200px;
    text-align: center;
/*     font-weight: bold; */
    display: inline-block;
    font-size: 15px;
/*     border-radius: 12px; */
/*     box-shadow: 5px 5px 5px rgb(190 190 190); */
/*     border-style: outset; */

`;
const SettingCss = styled.button`
    background-color: black;
    border: none;
    color: white; 
    width: 150px;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
/*     border-radius: 12px; */
    box-shadow: 2px 2px 3px rgb(190 190 190);
  `;

const SectionCss = styled.section`
      padding-top: 100px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: auto;
      height: auto;

`;
const FormCss = styled.form`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      /* border: 1px solid;*/
      border-radius: 12px;
`;

const InputCSS = styled.input`
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

const LabelCSS = styled.label`
font-size: 15px;
margin-top: 5px;
text-decoration: solid 1px black;
text-decoration: underline;

`;

const ImgCss = styled.img`
    padding-bottom: 20px;
    height: 15vmin;
    pointer-events: none;
    align-items: center;
    display: flex;
  `;

const MainCSS = styled.main`
        width: auto;
        background-image:url(${background}) ;
        padding-bottom: 145px;
      // background-color: orange;
  `;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
  }

  verifyNameAndEmail = () => {
    const { name, email } = this.state;
    const verifyEmail = /[^A-Z][a-z0-9_\-.]+@+[^A-Z]+\.com/.test(email);
    const verifyName = name.length > 0;
    return !(verifyEmail && verifyName);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email } = this.state;
    const { addPlayer, history } = this.props;
    const hashEmail = md5(email).toString();
    addPlayer({ name, hashEmail });

    if (getToken() === null) {
      saveToken(await this.fetchAPIToken());
    }
    history.push('/game');
  }

  fetchAPIToken = async () => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const result = await response.json();
      const { token } = result;
      return token;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { name, email } = this.state;
    return (
      <MainCSS>

        <SectionCss>
          <ImgCss src={ logo } alt="trivia image" />
          <FormCss onSubmit={ this.handleSubmit }>
            <LabelCSS htmlFor="player-name">
              Player Name:
              <InputCSS
                id="player-name"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                data-testid="input-player-name"
              />
            </LabelCSS>
            <LabelCSS htmlFor="player-email">
              Email:
              <InputCSS
                id="player-email"
                type="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
              />
            </LabelCSS>
            <BotaoCss
              data-testid="btn-play"
              type="submit"
              disabled={ this.verifyNameAndEmail() }
            >
              P L A Y
            </BotaoCss>
          </FormCss>
          <Link to="/settings">
            <SettingCss
              data-testid="btn-settings"
              type="submit"
            >
              Settings
            </SettingCss>
          </Link>
        </SectionCss>
      </MainCSS>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPlayer: (status) => dispatch(createPlayer(status)),

});

Login.propTypes = {
  addPlayer: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
