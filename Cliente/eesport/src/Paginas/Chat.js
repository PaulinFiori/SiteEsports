import React, { useEffect, useState } from 'react';
import './Chat.css';
import HeaderChat from './HeaderChat';
import { UsuarioAtual } from '../server';
import { Link, useHistory } from "react-router-dom";

import io from "socket.io-client";
import moment from "moment";

const socket = io("http://localhost:8000", {
  transports: ["websocket", "polling"]
});

var id = 0;
var nicknameatual = "anonimo ";

if(UsuarioAtual != null) nicknameatual = UsuarioAtual;
else {
  nicknameatual += id;
  id++;
}

const Chat = () => {
    document.title = "Chat";

    const [nicknames, setNicknames] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
      socket.on("connect", () => {
        socket.emit("nickname", nicknameatual);
      });
  
      socket.on("nicknames", nicknames => {
        setNicknames(nicknames);
      });

      socket.on("message", message => {
        setMessages(messages => [...messages, message]);
      });

      socket.on("connected", nickname => {
        setNicknames(nicknames => [...nicknames, nickname]);
      });
  
      socket.on("disconnected", id => {
        setNicknames(nicknames => {
          return nicknames.filter(nickname => nickname.id !== id);
        });
      });
    }, []);
  
    const submit = event => {
      event.preventDefault()
      socket.emit('send', message);
      setMessage("");
    };

    return(
        <div className="Chat">
            <ul className="list">
                <div id="messages">
                    {messages.map(({nickname, text, date }, index) => (
                        <div key={index} className="messages--lista">
                            <div className="messages--name">[{nickname}]</div>
                            <div className="messages--texto">{text}</div><br></br>
                            <div className="messages--hora">
                                {moment(date).format("hh:mm:ss a")}
                            </div>
                        </div>
                    ))}
                </div>
            </ul>
            <form className="form" onSubmit={submit}>
                <div className="input-group">
                    <span className="btn-send">
                      <Link to="/" className="link-send">Voltar ao login</Link>
                    </span>
                    <input
                    type="text"
                    className="form__field"
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    placeholder="Digite uma nova mensagem aqui..."
                    value={message}
                    id="text"
                    />
                    <span className="input-group-btn">
                        <button id="submit" type="submit" className="button-send">
                        Mandar mensagem
                        </button>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default Chat;