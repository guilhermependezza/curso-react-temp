import { API_URL } from '../config';

export const LoginService = {
  logar({ login, senha }) {
    return fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, senha })
    }).then(async response => {
      if(!response.ok) {
        const erroServidor = await response.json();
        const errorObj = Error(erroServidor.message);
        errorObj.status = response.status;
        throw errorObj;
      }
      return response.json();
    }).then(dadosServidor => {
      if(dadosServidor.token) {
        localStorage.setItem('TOKEN', dadosServidor.token);
        return;
      }

      throw new Error('Token not found')
    })
  }
}
