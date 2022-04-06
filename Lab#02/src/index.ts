import express from 'express';
import {Request, Response} from 'express';
import {readFile, writeFile, writeFileSync} from 'fs';
// look this s up
// import express.router from 'express.router';
import {Note, Tag, User} from './classes';
import jwt from 'jsonwebtoken';

const app = express()
app.use(express.json())
app.use(express.Router())

const notes = require('./Notes/notes');
const tags = require('./Tags/tags');

app.use('/note', notes)
app.use('/tag', tags)


app.post('/login', (req: Request, res: Response) => {
    const login = req.params.login;
    const password = req.params.password;
    const token = jwt.sign({login, password}, 'mysecret')
    console.log(token);
    res.status(200).send(token)
})

app.listen(3000)
