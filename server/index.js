//import the packages
//const express = request('express')
//const http = require('http')
import express from 'express'
import { createServer } from 'node:http'
import {Server} from 'socket.io'
import cors from 'cors'
import { request } from 'express';

//configurations
const app = express();
const server = createServer(app);
const io =new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        method: ['GET', 'POST']
    }
});

//middleware

app.use(cors())


//socket.io stuff
io.on('connection', (socket)=>{
    console.log("New client Connected");

    socket.on('message' , (message)=>{
        console.log('Message received: ', message);
        io.emit('message', message);
    })


    socket.on('disconnect', ()=>{
        console.log("Client disconnected")
    })


})


const PORT = 5000
server.listen(PORT ,()=>{
    console.log(`server is listening on port ${PORT}`);
})
