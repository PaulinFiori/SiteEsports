import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import ResultIcon from '@material-ui/icons/CheckCircle';
import ListGamesIcon from '@material-ui/icons/CalendarToday';
import SairIcon from '@material-ui/icons/ExitToApp';
import ChatIcon from '@material-ui/icons/Chat';
import {LogOut } from '../server';

function HeaderResultado() {
    return (
        <div className="header">  
                <div className="header__center">
                    <Link to="/inicio" className="header__link">
                        <div className="header__option">
                            <HomeIcon fontSize="large" />
                            <div className="header__info">
                               <h4 id = "nomeheader" >Início</h4>
                            </div>
                        </div>
                    </Link>  

                    <Link to="/listadejogos" className="header__link">
                        <div className="header__option">
                            <ListGamesIcon fontSize="large" />
                            <div className="header__info">
                                <h4 id = "nomeheader" >Lista de jogos</h4>
                            </div> 
                        </div>
                    </Link>

                    <Link to="/resultado" className="header__link">     
                        <div className="Header_Ativate">
                            <ResultIcon fontSize="large" />
                            <div className="header__info">
                               <h4 id = "nomeheader" >Resultados</h4>
                            </div>
                        </div>                
                    </Link>  

                <Link to="/perfil" className="header__link">
                    <div className="header__option">
                        <ProfileIcon fontSize="large" />
                            <div className="header__info">
                                <h4 id = "nomeheader" >Perfil</h4>
                            </div> 
                    </div>
                </Link>

                <Link to="/chat" className="header__link">
                        <div className="header__option">
                            <ChatIcon fontSize="large" />
                            <div className="header__info">
                               <h4 id = "nomeheader" >chat</h4>
                            </div>
                        </div>
                </Link>

                <Link to="/" className="header__link" onClick = {LogOut}>
                        <div className="header__option">
                            <SairIcon fontSize="large" />
                            <div className="header__info">
                                <h4 id = "nomeheader" >Sair</h4>
                            </div> 
                        </div>
                    </Link>      
                </div>  
        </div>
    )
}

export default HeaderResultado