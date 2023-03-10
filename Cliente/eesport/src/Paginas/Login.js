import React from 'react';
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import { FotoAtual, UsuarioAtual } from '../server';
import Axios from 'axios';

function Login() {
    document.title = "Login";
    var history = useHistory();

    function FazerLogin()
    {
        var NomeDigitado = document.getElementById('Nick').value;
        var SenhaDigitado = document.getElementById('Senha').value;

        if(NomeDigitado == '' || SenhaDigitado == '') alert("Preencha os campos!");
        else
        {
            Axios.put('http://localhost:3001/login', {
                Nickname: NomeDigitado,
                Senha: SenhaDigitado,
            }).then((response) => {
                if(response.data.message)
                {
                    alert(response.data.message);
                }
                else{
                    UsuarioAtual(response.data[0].Foto, response.data[0].Nickname, response.data[0].Senha, response.data[0].Email, response.data[0].Data_nascimento);
                    console.log(response.data[0]);
                    alert(response.data[0].Foto + "\n" + response.data[0].Nickname + "\n" + response.data[0].Senha + "\n" + response.data[0].Email + "\n" + response.data[0].Data_nascimento);
                    document.getElementById('Nick').value = '';
                    document.getElementById('Senha').value = '';
                    
                    history.push("/inicio");
                }
            });
        }
    }
    return(
        <div className= "loga">
            <form className="LoginForm">
                <h1 id= "Title">Login</h1> <br></br>
                <label> Nickname: <br></br>
                <input type="text" id="Nick"></input>
                </label><br></br><br></br>

                <label> Senha: <br></br>
                <input type="password" id="Senha"></input>
                </label><br></br><br></br>

                <button type="button" id="EntrarBotao" onClick={FazerLogin}>Entrar</button><br></br><br></br>
                É novo? &nbsp; <Link to="/registrar" className="LinkRegistro">Registre-se</Link><br></br><br></br>
                &nbsp; <Link to="/chat" className="LinkRegistro">Entrar no chat</Link>
            </form>
        </div>
    )
}

export default Login;