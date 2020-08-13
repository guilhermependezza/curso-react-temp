import React from 'react';
import { Link } from 'react-router-dom';


export default function NotFoundPage({ location }) {
  return (
    <div className='container'>
      A URL <strong>{location.pathname}</strong> não existe no Twitelum, se quiser voltar para a <Link to='/'>página inicial, clique aqui</Link>
    </div>
  )
}