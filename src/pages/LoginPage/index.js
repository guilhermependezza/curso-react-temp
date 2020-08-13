import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'

import './loginPage.css'
import { NotificacaoContext } from '../../contexts/NotificacaoContext'
import { Link } from 'react-router-dom'
import { LoginService } from '../../services/LoginService';

const InputFormField = ({ value, onChange, label, id, type = 'text', errors }) => {
  return (
    <div className="loginPage__inputWrap">
      <label className="loginPage__label" htmlFor={id}>{label}</label>
      <input value={value} onChange={onChange} className="loginPage__input" type={type} id={id} name={id} />
      <p style={{ color: 'red' }}>{errors && errors[id]}</p>
    </div>
  )
}

class LoginPage extends Component {
  static contextType = NotificacaoContext;

  constructor() {
    super();
    this.state = {
      values: {
        login: '',
        senha: ''
      },
      errors: {}
    }
  }

  formValidations = () => {
    const { login, senha } = this.state.values;
    const errors = {};

    if(!login) errors.login = 'Esse campo é obrigatório';
    if(!senha) errors.senha = 'Esse campo é obrigatório';

    this.setState({ errors });
  }

  fazerLogin = (event) => {
    event.preventDefault();

    if(!navigator.onLine) {
      this.context.setMsg('Tá offline irmão, ve aí o modem')
      return;
    }

    const dadosLogin = {
      login: this.state.values.login,
      senha: this.state.values.senha
    }

    LoginService.logar(dadosLogin)
      .then(() => {
        this.context.setMsg('login feito com sucesso');
        this.props.history.push('/')
      })
      .catch(err => {
        this.context.setMsg(err.message);
        console.error(`[Erro ${err.status}]`, err.message);
      })
  }

  onFormFieldChange = ({target}) => {
    const values = { ...this.state.values, [target.name]: target.value }
    this.setState({ values }, () => {
      this.formValidations();
    })
    
  }
  render() {
    return (
      <Fragment>
        <Cabecalho />
        <div className="loginPage">
          <div className="container">
            <Widget>
              <h2 className="loginPage__title">Seja bem vindo!</h2>
              <form
                className="loginPage__form"
                action="/"
                onSubmit={this.fazerLogin}>
                <InputFormField
                  value={this.state.values.login}
                  onChange={this.onFormFieldChange}
                  label='Login'
                  id='login'
                  errors={this.state.errors} />
                <InputFormField
                  value={this.state.values.senha}
                  onChange={this.onFormFieldChange}
                  label='Senha'
                  id='senha'
                  type='password'
                  errors={this.state.errors} />



                {/* <div className="loginPage__inputWrap">
                  <label className="loginPage__label" htmlFor="senha">Senha</label>
                  <input ref="inputSenha" className="loginPage__input" type="password" id="senha" name="senha" />
                </div> */}
                {/* <div className="loginPage__errorBox">
                                    Mensagem de erro!
                                </div> */}
                <div className="loginPage__inputWrap">
                  <button
                    className="loginPage__btnLogin"
                    type="submit">
                    Logar
                                    </button>
                </div>
              </form>
            </Widget>
          </div>
        </div>
                              <Link to='/'>{this.context.usuario}</Link>
      </Fragment>
    )
  }
}


export default LoginPage