import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import { ReactReduxContext } from 'react-redux';
import { TweetsThunkActions } from '../../store/ducks/tweets';
import TweetsContainer from '../../containers/TweetsContainer';


class HomePage extends Component {
  static contextType = ReactReduxContext;
  constructor() {
    super();

    this.state = {
      novoTweet: '',
      totalTweets: 0
    }
    this.usuario = '@guilherme';
  }

  componentDidMount() {
    this.context.store.subscribe(() => {
      const state = this.context.store.getState().tweets
      this.setState({
        totalTweets: state.data.length
      })
    });

    this.context.store.dispatch(TweetsThunkActions.carregaTweets())
  }

  adicionaTweet = event => {
    event.preventDefault();

    if(this.state.novoTweet.length > 0) {
        this.context.store
        .dispatch(TweetsThunkActions.addTweet(this.state.novoTweet))
        .then(() => this.setState({ novoTweet: '' }))
    }
  }

  render() {
    const { novoTweet } = this.state;
    const limite = 140;
    const tweetMaiorQueOPermitido = novoTweet.length > limite;
    const classeTweetInvalido = tweetMaiorQueOPermitido ? 'novoTweet__status--invalido' : '';
    const botaoDesabilitado = tweetMaiorQueOPermitido || novoTweet.length === 0;

    return (
      <Fragment>
        <Helmet>
          <title>Twitelum - ({`${this.state.totalTweets}`})</title>
        </Helmet>
        <Cabecalho>
          <NavMenu usuario={this.usuario} />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <form className="novoTweet" onSubmit={this.adicionaTweet}>
                <div className="novoTweet__editorArea">
                  <span className={`novoTweet__status ${classeTweetInvalido}`}>{novoTweet.length}/{limite}</span>
                  <textarea
                    value={novoTweet}
                    className="novoTweet__editor"
                    onChange={(event) => this.setState({ novoTweet: event.target.value })}
                    placeholder="O que está acontecendo?"></textarea>
                </div>
                <button
                  type="submit"
                  disabled={botaoDesabilitado}
                  className="novoTweet__envia">Tweetar</button>
              </form>
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <TweetsContainer />
            </Widget>
          </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default HomePage;
