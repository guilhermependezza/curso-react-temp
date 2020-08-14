import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware  from 'redux-thunk';

export const CARREGA_TWEETS = 'tweets/CARREGA';
export const CARREGADO_TWEETS = 'tweets/CARREGADO';
export const FALHA_NO_CARREGAMENTO_TWEETS = 'tweets/FALHA_NO_CARREGAMENTO';
export const ADICIONA_TWEET = 'tweets/ADICIONA_TWEET'
export const REMOVE_TWEET = 'tweets/REMOVE_TWEET'
export const TWEET_LIKE = 'tweets/TWEET_LIKE';
export const SET_ACTIVE_TWEET = 'tweets/SET_ACTIVE_TWEET';
export const UNSET_ACTIVE_TWEET = 'tweets/UNSET_ACTIVE_TWEET';


const INITIAL_STATE = {
  data: [],
  activeTweet: {},
  loading: false,
  error: false,
}

function calcTotalLikes(tweet) {
  return tweet.likeado ? tweet.totalLikes - 1 : tweet.totalLikes + 1
}

function setLike(data, id) {
  return data.map(t => t._id !== id ? t : ({
    ...t,
    likeado: !t.likeado,
    totalLikes: calcTotalLikes(t),
  }))
}


function tweetsReducer(state = INITIAL_STATE, action) {
  if(action.type === CARREGA_TWEETS) {
    return {
      ...state,
      loading: true,
      error: false
    }
  }

  if(action.type === CARREGADO_TWEETS) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
      error: false
    }
  }

  if(action.type === FALHA_NO_CARREGAMENTO_TWEETS) {
    return {
      ...state,
      loading: false,
      error: true,
      data: []
    }
  }

  if(action.type === ADICIONA_TWEET) {
    return {
      ...state,
      data: [action.payload.tweet, ...state.data],
      loading: false,
      error: false
    }
  }

  if(action.type === REMOVE_TWEET) {
    return {
      ...state,
      data: state.data.filter(({ _id }) => _id !== action.payload.id),
      loading: false,
      activeTweet: {},
      error: false
    }
  }

  if(action.type === TWEET_LIKE) {
    const newData = setLike(state.data, action.payload.id);
    const oldActiveTweet = state.activeTweet;
    const newActiveTweet = oldActiveTweet._id ? 
      newData.find(t => t._id === action.payload.id) : {}
    

    return {
      ...state,
      data: newData,
      activeTweet: newActiveTweet,
      loading: false,
      error: false
    }
  }

  if(action.type === SET_ACTIVE_TWEET) {
    return {
      ...state,
      activeTweet: state.data.filter(({ _id }) => _id === action.payload.id)[0]
    }  
  }

  if(action.type === UNSET_ACTIVE_TWEET) {
    return {
      ...state,
      activeTweet: {}
    }  
  }

  return state;
}

export default createStore(combineReducers({
  tweets: tweetsReducer
}), applyMiddleware(thunkMiddleware));
