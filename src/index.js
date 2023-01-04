import { PORT, MONGODB_URI } from "./config";

import express from 'express';
import path from 'path';
import cors from 'cors';

import { Server as WebsocketServer } from 'socket.io';
import http from 'http';
import sockets from "./sockets";
import { connect } from "mongoose";


//-- CONNECTING MONGO DB --//
const connectDB = async () => {
    try {
        await connect(MONGODB_URI);
        console.log('>>> DB Connected <<<');
    } catch (error) {
        console.log(error)
    }
};  
connectDB();


//-- CREATE APP SERVER --//
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/user' , require('./routes/user'));
app.use('/api/login', require('./routes/login'));
app.use('/bikes'    , require('./routes/bikes'));


//-- CONNECTING Express HTTP Server WITH Socket IO Server --//
const server = http.createServer(app); // App is send to Websocket as a Server 
const httpServer = server.listen(PORT);
const io = new WebsocketServer(httpServer);
sockets(io);
console.log('Server running on port ' + PORT);
