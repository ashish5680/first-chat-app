const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const path = require('path');


app.use('/', express.static(path.join(__dirname, 'public')));



const users={}    // we make a users object





io.on('connection', (socket) => {

    // console.log(`Connection Established --> ${socket.id}`);
    
    socket.on('send_msg', (data) => {

        io.emit('recieved_msg', {
            msg: data.msg,
            // id: socket.id
            user: users[socket.id]
        })

    });

    socket.on('login', (data) => {
        users[socket.id] = data.user;      // key value mapping kar di idhar
    });

});




           // heroku is going to pass this port || localhost port
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`server running at port ${port}`);
});