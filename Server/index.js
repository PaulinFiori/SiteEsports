//dependencies
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require("cors");
const HLTV = require('hltv-api').default;
const leagueoflegends = require('lol-esports-api-module'), lol = new leagueoflegends();
app.use(express.json());
app.use(cors());

//database connection
const bd = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "123456pf",
    database: "Jogos",
});

// Routes
app.post('/register', (req, res)=> {
  const Foto = req.body.Foto;
  const Nickname = req.body.Nickname;
  const Senha = req.body.Senha;
  const Email = req.body.Email;
  const Data_Nascimento = req.body.Data_Nascimento;

  console.log("Dados recebidos");
    
  bd.query( 'INSERT INTO Perfil (Foto, Nickname, Senha, Email, Data_Nascimento) VALUES (?,?,?,?,?)', [Foto, Nickname, Senha, Email, Data_Nascimento], (err, result) => { 
    if(err)
    {
      res.send({message: "Não foi possível fazer registro!"});
      console.log("err");
    }
    else res.send(result);
    console.log(result);
  }); 
});


app.put('/login', (req, res)=> {
  const Nickname = req.body.Nickname;
  const Senha = req.body.Senha;
  
  bd.query("SELECT * FROM Perfil WHERE Nickname = ? AND Senha = ?", [Nickname, Senha], (err, result) => {
    if(err)
    {
      res.send({message: err});
      console.log(err);
    }
      
    if(result.length > 0)
    {
      res.send(result);
      console.log(result);
    }
  
    else
    {
      res.send({message: "Usuário/Senha inválido!"});
      console.log(err);
    }
  }); 
});

app.post('/resultados', async (req, res)=> {
  const Jogo = req.body.Jogo;

  if(Jogo == "League of Legends")
  {
  }

  if(Jogo == "Counter Strike: Global Offesive")
  {
    const results = await HLTV.getResults(); 
    res.json(results);
    console.log("Enviando resultado");
  }
});

app.put('/editarperfil', (req, res)=> {
  const Foto = req.body.Foto;
  const Nickname = req.body.Nickname;
  const Email = req.body.Email;
  const Data_Nascimento = req.body.Data_Nascimento;
  const NicknameAtual = req.body.NicknameAtual;

  bd.query("UPDATE Perfil SET Foto = ?, Nickname = ?, Email = ?, Data_Nascimento = ? WHERE Nickname = ?", [Foto, Nickname, Email, Data_Nascimento, NicknameAtual], (err, result) => {
    if(err)
    {
      console.log(err);
    }
    else res.send({message: "Atualizado com sucesso"});
    console.log("Atualizado com sucesso");
  });
});

app.post('/jogos', async (req, res)=>{
  const Jogo = req.body.Jogo;

  if(Jogo == "League of Legends")
  {
    lol.getSeries((err, data) => {
      console.log(data);
    });
  }

  if(Jogo == "Counter Strike: Global Offesive")
  {
    const matches = await HLTV.getMatches();
    res.json(matches);
    console.log("Enviando partidas");
  }
});

//rodar servidor
app.listen(3001, () => {
  console.log("Rodando o servidor em http://localhost:3001");
})