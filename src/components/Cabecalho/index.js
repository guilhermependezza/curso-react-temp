import React, { Component } from 'react'
import cabecalho from './cabecalho.module.css'
import { Link } from 'react-router-dom';


class Cabecalho extends Component {
    render() {
        return (
            <header className={cabecalho.cabecalho}>
                <div className={`${cabecalho.cabecalho__container} ${cabecalho.container}`}>
                    <h1 className={cabecalho.cabecalho__logo}>
                        <Link to='/'>Twitelum</Link>
                    </h1>
                    { this.props.children }
                </div>
            </header>
        )
    }
}

export default Cabecalho