import express from 'express';
import path from 'path';

const app = express(); // La funcion devuelve un obj que se guarda en app

app.use(express.static(path.join(__dirname, 'public')))

export default app;
