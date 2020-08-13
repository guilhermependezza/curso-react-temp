import { 
  CARREGA_TWEETS,
  CARREGADO_TWEETS,
  FALHA_NO_CARREGAMENTO_TWEETS
} from '../..';

import { API_URL } from '../../../config';


export const TweetsThunkActions = {
  carregaTweets: () => {
    return dispatch => {
      const token = localStorage.getItem('TOKEN');
      dispatch({ type: CARREGA_TWEETS });

      fetch(`${API_URL}/tweets/?X-AUTH-TOKEN=${token}`)
      .then(res => res.json())
      .then(tweets => {
        dispatch({
          type: CARREGADO_TWEETS,
          payload: {
            data: tweets
          }
        })
      })
      .catch(() =>  {
        dispatch({ type: FALHA_NO_CARREGAMENTO_TWEETS })
      })
    }
  }
}
