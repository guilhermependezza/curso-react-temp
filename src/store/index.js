import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware  from 'redux-thunk';

export const CARREGA_TWEETS = 'tweets/CARREGA';
export const CARREGADO_TWEETS = 'tweets/CARREGADO';
export const FALHA_NO_CARREGAMENTO_TWEETS = 'tweets/FALHA_NO_CARREGAMENTO';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
}


function tweetsReducer(state = INITIAL_STATE, action) {
  console.log(action.type);
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

  return state;
}

export default createStore(combineReducers({
  tweets: tweetsReducer
}), applyMiddleware(thunkMiddleware));
