import React from 'react';
import './Home.css';
import Header from './Header';

function Home() {
    document.title = "Início";
    return(
        <div className="home">
            <Header/>
            <h1 id= "welcome">Seja Bem-vindo!</h1>
            <p id= "texto">O site tem objetivo de mostrar resultados de E-sport de algum jogos! Espero que gostem.</p>
        </div>
    )
}

export default Home;