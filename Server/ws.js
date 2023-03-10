//chat
const Koa = require('koa');
const websocketporta = 8000;
const app1 = new Koa();
const server = require("http").createServer(app1.callback());
const io = require("socket.io")(server, {
    transports: ["websocket", "polling"]
})

const users = [];

io.on('connection', cliente => {
    console.log("Nova conexão estabelecida!");
    cliente.on("nickname", nickname => {
        const user = {
            name: nickname,
            id: cliente.id
        };
        users[cliente.id] = user;
        io.emit("connected", user);
        io.emit("nicknames" , Object.values(users));
    });

    cliente.on("send", message => {
        console.log('Mensagem: ', message);
        io.emit("message", {
            text: message,
            date: new Date().toISOString(),
            user: users[cliente.id]
        });
    });

    cliente.on("disconnect", () => {
        const nickname = users[cliente.id];
        delete users[cliente.id];
        io.emit("disconnected", cliente.id);
    });
});

server.listen(websocketporta);
console.log("Servidor está rodando em http://localhost:8000");