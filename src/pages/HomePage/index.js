import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import { Modal } from '../../components/Modal';
import { ReactReduxContext } from 'react-redux';
import { TweetsThunkActions } from '../../store/ducks/tweets';
import { TweetsService } from '../../services/TweetsService';


class HomePage extends Component {
  static contextType = ReactReduxContext;
  constructor() {
    super();

    this.state = {
      novoTweet: '',
      tweets: [],
      tweetAtivoNoModal: {}
    }
    this.usuario = '@guilherme';
  }

  componentDidMount() {
    this.context.store.subscribe(() => {
      const state = this.context.store.getState().tweets
      this.setState({
        tweets: state.data
      })
    });

    this.context.store.dispatch(TweetsThunkActions.carregaTweets())
  }

  adicionaTweet = event => {
    event.preventDefault();

    if(this.state.novoTweet.length > 0) {
      TweetsService.adiciona(this.state.novoTweet)
        .then(tweet => {
          console.log(tweet)
          this.setState({
            tweets: [tweet, ...this.state.tweets],
            novoTweet: ''
          })
        })
    }
  }

  removeTweet = (id) => {
    const newTweets = this.state.tweets.filter(tweet => tweet._id !== id);
    TweetsService
      .remove(id)
      .then(response => {
        console.log(response)
        this.setState({ tweets: newTweets })
        this.fechaModal();
      });
  }

  renderTweets = () => {
    const mensagem = 'Crie um tweet';
    return this.state.tweets.length ? this.state.tweets.map((tweet) => (
      <Tweet 
        key={tweet._id}
        id={tweet._id}
        likeado={tweet.likeado}
        removivel={tweet.removivel}
        totalLikes={tweet.totalLikes}
        onClickTweet={() => this.abreModal(tweet)}
        usuario={tweet.usuario}
        removeHandler={this.removeTweet}
        texto={tweet.conteudo} />
    )) : mensagem
  }

  abreModal = (tweet) => {
    this.setState({
      tweetAtivoNoModal: tweet
    })
  }

  fechaModal = () => {
    this.setState({
      tweetAtivoNoModal: {}
    })
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
          <title>Twitelum - ({`${this.state.tweets.length}`})</title>
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
              <div className="tweetsArea">
                {this.renderTweets()}                
              </div>
            </Widget>
          </Dashboard>
        </div>
        <Modal
          isOpen={!!this.state.tweetAtivoNoModal._id}
          onClose={this.fechaModal}
          >
            {() => (
              <Tweet 
                key={this.state.tweetAtivoNoModal._id}
                id={this.state.tweetAtivoNoModal._id}
                likeado={this.state.tweetAtivoNoModal.likeado}
                removivel={this.state.tweetAtivoNoModal.removivel}
                totalLikes={this.state.tweetAtivoNoModal.totalLikes}
                usuario={this.state.tweetAtivoNoModal.usuario}
                removeHandler={() => this.removeTweet(this.state.tweetAtivoNoModal._id)}
                texto={this.state.tweetAtivoNoModal.conteudo}
              />
            )}
        </Modal>
      </Fragment>
    );
  }
}

export default HomePage;
