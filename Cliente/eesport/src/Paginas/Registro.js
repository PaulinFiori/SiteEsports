import React from 'react';
import './Registro.css';
import { Link, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Axios from 'axios';

function Registro() {
    document.title = "Registrar";
    var history = useHistory();

    function FazerRegistro()
    {
        var fotoescolhida = document.getElementById('ImagemBotao').value;
        var nomeDigitado = document.getElementById('NickRegistro').value;
        var emailDigitado = document.getElementById('EmailRegistro').value;
        var senhaDigitado = document.getElementById('SenhaRegistro').value;
        var confirmarsenhadigitado = document.getElementById('ConfirmarSenhaRegistro').value;
        var datanascimentodigitado = document.getElementById('DataNascimentoRegistro').value;
  
        if(senhaDigitado != confirmarsenhadigitado) alert("As senhas nao coincidem!");
        else if(nomeDigitado == "" || emailDigitado == "" || senhaDigitado == "" || confirmarsenhadigitado == "" || datanascimentodigitado == "") alert("Preencha todos os campos!");
        else
        {
            Axios.post('http://localhost:3001/register', {
                Foto: fotoescolhida,
                Nickname: nomeDigitado,
                Senha: senhaDigitado,
                Email: emailDigitado,
                Data_Nascimento: datanascimentodigitado,
            }).then((response) => {
                if(response.data.message)
                {
                    alert(response.data.message);
                }
                else{
                    alert("Cadastrado com sucesso!");
                    alert(response.data[0].Foto + "\n" + response.data[0].Nickname + "\n" + response.data[0].Senha + "\n" + response.data[0].Email + "\n" + response.data[0].Data_nascimento);
                    history.push('/');
                }
            });
        }
    }

    return(
        <div className= "registro">
            <form className="RegistroForm">
                <h1> Cadastro </h1>

                <label> Foto: <br></br>
                    <input accept="image/*" id="ImagemBotao" type="file" />
                </label><br></br><br></br>

                <label> Nickname: <br></br>
                    <input type="text" id="NickRegistro" className="inputregistro"></input>
                </label><br></br><br></br>

                <label> Email: <br></br>
                    <input type="text" id="EmailRegistro" className="inputregistro"></input>
                </label><br></br><br></br>

                <label> Senha: <br></br>
                    <input type="password" id="SenhaRegistro" className="inputregistro"></input>
                </label><br></br><br></br>

                <label> Confirmar Senha: <br></br>
                    <input type="password" id="ConfirmarSenhaRegistro" className="inputregistro"></input>
                </label><br></br><br></br>

                <label> Data de nascimento: <br></br>
                    <input type="text" id="DataNascimentoRegistro" className="inputregistro" placeholder = "dd/mm/yyyy"></input>
                </label><br></br><br></br>

                <button type="button" id="CadastrarBotao" onClick={FazerRegistro}>Cadastrar</button><br></br><br></br>
                <Link to="/" className="LinkLogin">Voltar ao login</Link>
            </form>
        </div>
    )
}

export default Registro;