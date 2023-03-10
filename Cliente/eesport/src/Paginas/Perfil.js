import React from 'react';
import './Perfil.css';
import Header from './HeaderPerfil';
import { Link, useHistory } from "react-router-dom";
import { FotoAtual, NomeAtual, EmailAtual, DataNascimentoAtual } from '../server';
import Axios from 'axios';

function Mostrar_Perfil()
{
    document.getElementById('Nick').value = NomeAtual;
    document.getElementById('Email').value = EmailAtual;
    document.getElementById('DataPerfil').value = DataNascimentoAtual;
}

function Editar_Perfil()
{
    var fotoescolhida = document.getElementById('ImagemBotaoPerfil').value;
    var nomeDigitado = document.getElementById('Nick').value;
    var emailDigitado = document.getElementById('Email').value;
    var datanascimentodigitado = document.getElementById('DataPerfil').value;

    if(nomeDigitado == "" || emailDigitado == "" || datanascimentodigitado == "") alert("Preencha todos os campos!");
    else
        {
            Axios.put('http://localhost:3001/editarperfil', {
                Foto: fotoescolhida,
                Nickname: nomeDigitado,
                Email: emailDigitado,
                Data_Nascimento: datanascimentodigitado,
                NicknameAtual: NomeAtual,
            }).then((response) => {
                if(response.data.message)
                {
                    alert(response.data.message);
                }
                else{
                    alert("Perfil editado com sucesso!");
                    console.log(response.data[0]);
                    alert(response.data[0].Foto + "\n" + response.data[0].Nickname + "\n" + response.data[0].Senha + "\n" + response.data[0].Email + "\n" + response.data[0].Data_nascimento);
                }
            });
        }
}

function Perfil() 
{
    document.title = "Perfil";
    return (
        <div className= "perfil">
            <Header/>
            <form className="PerfilForm">
                <h1 id="TituloPerfil"> Perfil </h1>  
                
                <label>
                    <img id="myimage"/>
                </label><br></br>
                <label id = "#Texts"> Mudar foto: &nbsp;
                    <input accept="image/*" id="ImagemBotaoPerfil" type="file" />
                </label><br></br><br></br>

                <label id="#Texts">Nickname: &nbsp;
                    <input type="text" id="Nick"></input>
                </label><br></br><br></br>

                <label id="#Texts">Email: &nbsp;
                    <input type="text" id="Email"></input>
                </label><br></br><br></br>

                <label id="#Texts">Data de nascimento: &nbsp;
                    <input type="text" id="DataPerfil"></input>
                </label><br></br><br></br>
                
                <button type="button" id="MostrarPerfil" onClick = {Mostrar_Perfil}>Mostrar Perfil</button>
                <button type="button" id="EditarBotao" onClick = {Editar_Perfil}>Editar Perfil</button><br></br><br></br>

            </form>
        </div>
       
    )
        
}

export default Perfil;