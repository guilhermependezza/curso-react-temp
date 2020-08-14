import React, { Component } from 'react';
import { Modal } from '../components/Modal';
import { ReactReduxContext } from 'react-redux';
import { TweetsThunkActions } from '../store/ducks/tweets';

import Tweet from '../components/Tweet'

export default class TweetsContainer extends Component {
  static contextType = ReactReduxContext;

  constructor() {
    super();
    this.state = {
      tweets: [],
      tweetAtivoNoModal: {}
    }
  }

  componentDidMount() {
    this.context.store.subscribe(() => {
      const state = this.context.store.getState().tweets
      this.setState({
        tweets: state.data,
        tweetAtivoNoModal: state.activeTweet
      })
    });

    this.context.store.dispatch(TweetsThunkActions.carregaTweets())
  }

  likeHandler = (id) => {
    this.context.store.dispatch(TweetsThunkActions.like(id))
  }

  abreModal = (id) => {
    this.context.store.dispatch(TweetsThunkActions.setActiveTweet(id))
  }

  fechaModal = () => {
    this.context.store.dispatch(TweetsThunkActions.unsetActiveTweet())
  }

  removeTweet = (id) => {
    this.context.store.dispatch(TweetsThunkActions.removeTweet(id));
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
        onClickTweet={() => this.abreModal(tweet._id)}
        likeHandler={() => this.likeHandler(tweet._id)}
        usuario={tweet.usuario}
        removeHandler={this.removeTweet}
        texto={tweet.conteudo} />
    )) : mensagem
  }
  render() {
    return (
      <>
        <div className="tweetsArea">
          {this.renderTweets()}                
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
                likeHandler={() => this.likeHandler(this.state.tweetAtivoNoModal._id)}
                usuario={this.state.tweetAtivoNoModal.usuario}
                removeHandler={() => this.removeTweet(this.state.tweetAtivoNoModal._id)}
                texto={this.state.tweetAtivoNoModal.conteudo}
              />
            )}
        </Modal>
      </>
    )
    
  }
}