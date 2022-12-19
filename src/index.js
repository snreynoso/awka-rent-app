import { PORT } from "./config";

import app from "./app";
import { Server as WebsocketServer } from 'socket.io'; // Importamos la clase Server y la renombramos
import http from 'http';
import sockets from "./sockets";
import { connectDB } from './db';

connectDB();

// Conecting Express HTTP Server with Socket Server 
const server = http.createServer(app); // Esto es para poder pasar app como servidor a WebsocketServer 
const httpServer = server.listen(PORT);
console.log('Server running on port ' + PORT);

const io = new WebsocketServer(httpServer);
sockets(io);
