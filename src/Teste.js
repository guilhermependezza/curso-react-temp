import React, { Component, useState } from 'react';

const buttonStyle = {
  width: '100px',
  height: '100px'
}


export default class Teste extends Component {
  constructor() {
    super();

    this.state = {
      texto: ''
    }
  }

  setTexto = (evento) => {
    console.log(evento.target.value);
    this.setState({
      texto: evento.target.value
    })
  }

  render() {
    console.log(this.state.lista)
    return (
      <div style={{
        margin: '0 auto',
        width: '600px'
      }}>
        <textarea onChange={this.setTexto}></textarea>
        <p>{this.state.texto}</p>
        <div>
          <button onClick={this.incluiNaLista} style={buttonStyle}>+</button>
        </div>
      </div>
    )
  }
}

// export default function Teste() {
//   const [contador, setContador] = useState(0);

//   function incrementa() {
//     console.log('incrementa');
//     setContador(contador + 1)
//   }

//   function decrementa() {
//     console.log('decrementa');
//     setContador(contador - 1)
//   }
  
//   return (
//     <div style={{
//       margin: '0 auto',
//       width: '600px'
//     }}>
//       <div>{contador}</div>
//       <div>
//         <button onClick={decrementa} style={buttonStyle}>-</button>
//         <button onClick={incrementa} style={buttonStyle}>+</button>
//       </div>
//     </div>
//   )
  
// }