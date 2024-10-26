import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";

import Connection from './database/db.js';

//Route
import Route from "./routes/route.js";

dotenv.config();

const app = express();

const corsOptions = {
    origin: ["http://localhost:3001", "http://localhost:3000"],
    credentials: true
  };

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', Route);

const PORT = 8000;
app.listen(PORT, ()=> console.log(`Server is running successfully on ${PORT}`));

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

