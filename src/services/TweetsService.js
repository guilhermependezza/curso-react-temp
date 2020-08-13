import { API_URL } from '../config';
const token = localStorage.getItem('TOKEN');

export const TweetsService = {
  like(id) {
    return fetch(`${API_URL}/tweets/${id}/like?X-AUTH-TOKEN=${token}`, { method: 'POST' })
      .then(res => res.json())
  },

  carrega() {
    return fetch(`${API_URL}/tweets/?X-AUTH-TOKEN=${token}`)
      .then(res => res.json())
  },

  adiciona(conteudo) {
    return fetch(`${API_URL}/tweets/?X-AUTH-TOKEN=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ conteudo })
    })
    .then(res => res.json())
  },

  remove(id) {
    return fetch(`${API_URL}/tweets/${id}?X-AUTH-TOKEN=${token}`, { method: 'DELETE' })
      .then(res => res.json())
  }
}