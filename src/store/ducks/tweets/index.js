import { 
  CARREGA_TWEETS,
  CARREGADO_TWEETS,
  FALHA_NO_CARREGAMENTO_TWEETS
} from '../..';

import { TweetsService } from '../../../services/TweetsService';


export const TweetsThunkActions = {
  carregaTweets: () => {
    return dispatch => {
      const token = localStorage.getItem('TOKEN');
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
        .catch(() =>  {
          dispatch({ type: FALHA_NO_CARREGAMENTO_TWEETS })
        })
    }
  }
}
