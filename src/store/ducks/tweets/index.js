import {
  CARREGA_TWEETS,
  CARREGADO_TWEETS,
  FALHA_NO_CARREGAMENTO_TWEETS,
  ADICIONA_TWEET,
  REMOVE_TWEET,
  TWEET_LIKE,
  SET_ACTIVE_TWEET,
  UNSET_ACTIVE_TWEET
} from '../..';

import { TweetsService } from '../../../services/TweetsService';

export const TweetsThunkActions = {
  carregaTweets() {
    return dispatch => {
      dispatch({ type: CARREGA_TWEETS });

      TweetsService
        .carrega()
        .then(tweets => {
          dispatch({
            type: CARREGADO_TWEETS,
            payload: {
              data: tweets
            }
          })
        })
        .catch(() => {
          dispatch({ type: FALHA_NO_CARREGAMENTO_TWEETS })
        })
    }
  },

  addTweet(conteudo) {
    return async dispatch => {
      const tweet = await TweetsService.adiciona(conteudo);
      dispatch({
        type: ADICIONA_TWEET,
        payload: { tweet }
      })
    }
  },

  removeTweet(id) {
    return async dispatch => {
      await TweetsService.remove(id)
      dispatch({ type: REMOVE_TWEET, payload: { id } })
    }
  },

  like(id) {

    return async dispatch => {
      await TweetsService
        .like(id)
        .then(() => {
          dispatch({
            type: TWEET_LIKE,
            payload: { id }
          })
        });
    }
  },

  setActiveTweet(id) {
    return dispatch => {
      dispatch({ type: SET_ACTIVE_TWEET, payload: { id } })
    }
  },

  unsetActiveTweet() {
    return dispatch => {
      dispatch({ type: UNSET_ACTIVE_TWEET })
    }
  }
}
