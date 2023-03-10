import React from 'react';
import './Resultado.css';
import Header from './HeaderResultado';
import Axios from 'axios';

function Mostrar_Resultado()
{
    var select = document.getElementById('SelectResultado');
	var JogoEscolhido = select.options[select.selectedIndex].value;

    if(JogoEscolhido == "Nenhum") alert("Escolha um jogo!");
    else{
        Axios.post('http://localhost:3001/resultados', {
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
                    if(i == 0) document.getElementById('Lista').innerHTML = "";
                    var data = response.data[i]["time"].split("T");
                    var datacerta = data[0];
                    var horario = datacerta.split("-");
                    var horariocerto = horario[2] + "/" + horario[1] + "/" + horario[0];

                    var vencedor = "";
                    if(response.data[i]["team1"]["result"] > response.data[i]["team2"]["result"]) vencedor = response.data[i]["team1"]["name"];
                    else if((response.data[i]["team1"]["result"] < response.data[i]["team2"]["result"])) vencedor = response.data[i]["team2"]["name"];
                    else if(response.data[i]["team1"]["result"] == response.data[i]["team2"]["result"]) vencedor = "Empate";

                    document.getElementById('Lista').innerHTML += "<div id='Partida'>" + response.data[i]["team1"]["name"] + " " + response.data[i]["team1"]["result"] + " X " + response.data[i]["team2"]["result"] + " " + response.data[i]["team2"]["name"] + " " + horariocerto + "<br></br>" + "Vencedor = " + vencedor + "</div>" + "<br></br>";
                }
            }
        });
    }
}

function Resultado() {
    document.title = "Resultado";
    return(
        <div className= "Resultado">
            <Header />
            <div className="ResultadoDiv">
                <h1 id="Titulo">Resultados</h1>

                <div className="PesquisarJogos">

                    <label id = "TextJogo">Jogo: &nbsp;</label>
                    <select id="SelectResultado">
                        <option value="Nenhum"> Nenhum</option>
                        <option value="League of Legends"> League of Legends</option>
                        <option value="Counter Strike: Global Offesive"> Counter Strike: Global Offesive</option>
                    </select> &nbsp;

                    <button type="button" className="PesquisarResultadoBotao" onClick={Mostrar_Resultado}>Pesquisar</button>
                </div>

                <div id="Lista">
                </div>
            </div>
        </div>
    )
}

export default Resultado;