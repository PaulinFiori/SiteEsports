import React from 'react';
import './Jogos.css';
import Header from './HeaderLista';
import Axios from 'axios';

function CarregarLista()
{
    var select = document.getElementById('SelectJogos');
	var JogoEscolhido = select.options[select.selectedIndex].value;

    if(JogoEscolhido == "Nenhum") alert("Escolha um jogo!");
    else{
        Axios.post('http://localhost:3001/jogos', {
            Jogo: JogoEscolhido,
        }).then((response) => {
            if(response.data.message)
            {
                alert(response.data.message);
            }
            else{
                console.log(response.data);
                for(let i = 0; i < response.data.length; i++)
                {
                    if(i == 0) document.getElementById('JogosPartidas').innerHTML = "";
                    var data = response.data[i]["time"].split("T");
                    var datacerta = data[0];
                    var horario = datacerta.split("-");
                    var horariocerto = horario[2] + "/" + horario[1] + "/" + horario[0];
                    document.getElementById('JogosPartidas').innerHTML += "<div id='PartidasFuturas'><span id='TimeA'>" + response.data[i]["teams"][0]["name"] + "</span><span id='X'> X </span><span id='TimeB'>" + response.data[i]["teams"][1]["name"] + "</span><span id='Data'>" + horariocerto + "</span></div>";
                }
            }
        });
    }
}

function Jogos() {
    document.title = "Jogos";
    return(
        <div className= "Jogos">
            <Header/>

            <div className="Lista">
                <h1 id="TituloJogos">Jogos futuros</h1>

                <div className="PesquisarJogos">

                    <label id = "TextJogo">Jogo: &nbsp;</label>
                    <select id="SelectJogos">
                        <option value="Nenhum"> Nenhum</option>
                        <option value="League of Legends"> League of Legends</option>
                        <option value="Counter Strike: Global Offesive"> Counter Strike: Global Offesive</option>
                    </select> &nbsp;

                    <button type="button" className="PesquisarJogosBotao" onClick={CarregarLista}>Pesquisar</button>
                </div>

                <div id="JogosPartidas">
                    
                </div>
            </div>
        </div>
    )
}

export default Jogos;