import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './tweet.css'
import { API_URL } from '../../config';
import { TweetsService } from '../../services/TweetsService';

class Tweet extends Component {
    constructor(props) {
        super();

        this.state = {
            likeado: props.likeado,
            totalLikes: props.totalLikes
        }
    }

    likeHandler = () => {
        const { likeado, totalLikes } = this.state;
        this.setState({
            likeado: !likeado,
            totalLikes: likeado ? totalLikes - 1 : totalLikes + 1
        });
        
        TweetsService
            .like(this.props.id)
            .then(console.log);
        
    }

    handleTweetClick = () => {
        this.props.onClickTweet && this.props.onClickTweet()
    }

    render() {
        const { usuario, texto, id } = this.props;
        const { likeado, totalLikes } = this.state;
        const liked = likeado ? 'iconHeart--active' : '';
        return (
            <article className="tweet">
                <div className="tweet__cabecalho">
                    <img className="tweet__fotoUsuario" src={usuario.foto} alt="" />
                    <span className="tweet__nomeUsuario">{usuario.nome}</span>
                    <a href="/"><span className="tweet__userName">@{ usuario.login }</span></a>
                </div>
                <p
                    className="tweet__conteudo"
                    onClick={this.handleTweetClick}>
                    {texto}
                </p>
                <footer className="tweet__footer">
                    
                    <button className="btn btn--clean" onClick={this.likeHandler}>
                        <svg className={`icon icon--small iconHeart ${liked}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5">
                            <defs>
                                <clipPath id="a">
                                    <path d="M0 38h38V0H0v38z"></path>
                                </clipPath>
                            </defs>
                            <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
                                <path d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.632-8.018-4.128-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.773.098-1.52.266-2.242C2.75 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.47.268 2.241"></path>
                            </g>
                        </svg>
                        {totalLikes}
                    </button>
                    { this.props.removivel && (
                        <button onClick={() => this.props.removeHandler(id)} className="btn btn--blue btn--remove">x</button>
                    ) }
                </footer>
            </article>
        )
    }
}

Tweet.propTypes = {
    id: PropTypes.string.isRequired,
    likeado: PropTypes.bool.isRequired,
    removivel: PropTypes.bool,
    totalLikes: PropTypes.number.isRequired,
    usuario: PropTypes.shape({
        nome: PropTypes.string,
        foto: PropTypes.string,
        login: PropTypes.string
    }),
    removeHandler: PropTypes.func,
    texto: PropTypes.string,
}

Tweet.defaultProps = {
    usuario: {
        foto: 'https://images.impresa.pt/blitz/2020-06-23-rick-astley.jpg/original/mw-860',
        nome: 'Rick Astley',
        login: 'rickastley'
    },
    removivel: false,
}

export default Tweet