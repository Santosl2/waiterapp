import express from 'express';
import http from 'node:http';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import {router} from './router';
import * as dotenv from 'dotenv';
import path from 'node:path';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);


dotenv.config();
const CONNECTIONSTRING = process.env.MONGO_KEY || '';
mongoose.connect(CONNECTIONSTRING,)
  .then(()=> {
    const port = 3001;




    app.use((req,res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');//serve pra dizer qual dominio que está autorizado a acessar a api
      res.setHeader('Access-Control-Allow-Methods', '*');//serve pra dizer quais metodos http estão autorizados a acessar a api
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();//funciona como um middleware que vai para o proximo middleware ou para a rota que está sendo chamada
    });
    app.use('/uploads',express.static(path.resolve(__dirname,'..','uploads')));//cria uma rota para acessar os arquivos que estão na pasta uploads e diz que estes arquivos são estáticos
    app.use(express.json());
    app.use(router);

    server.listen(port,()=>{
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch(()=> console.log('❌ Failed to connect to MongoDB'));
