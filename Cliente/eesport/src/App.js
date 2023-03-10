import React, { Component } from 'react';
import 'primeicons/primeicons.css';
import './App.css';
import Header from './Paginas/Header';
import {withRouter} from 'react-router-dom';
import Login from './Paginas/Login';
import Registro from './Paginas/Registro';
import Home from './Paginas/Home';
import Resultado from './Paginas/Resultado';
import Lista from './Paginas/Jogos';
import Perfil from './Paginas/Perfil';
import Chat from './Paginas/Chat';
import {  BrowserRouter as Router, Switch, Route,} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/inicio">
            <Home/>
        </Route>
        <Route path="/resultado">
            <Resultado/>
        </Route>
        <Route path="/listadejogos">
            <Lista/>
        </Route>
        <Route path="/perfil">
            <Perfil/>
        </Route>
        <Route path="/chat">
            <Chat/>
        </Route>
        <Route path="/registrar">
            <Registro/>
        </Route>
        <Route path="/">
            <Login/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;