import express, {Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken';

const store = new UserStore()
const token_secret = process.env.TOKEN_SECRET!;


const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}
const show = async (_req: Request, res: Response) => {
    const user = await
    store.show(_req.body.id)
    res.json(user)
}

const create = async (_req: Request, res: Response) => {
     const user: User = {
         username: _req.body.username,
         password: _req.body.password,
         firstname: _req.body.firstname,
         lastname: _req.body.lastname
     } 
     try {
         const newUser = await store.create(user)
         var token = jwt.sign({ user: newUser }, token_secret);
         res.json(token)
     } catch(err) {
         res.status(400)
         res.json(err)
     }
}

const destroy = async (_req: Request, res: Response) => {
    const deleted = await store.delete(_req.body.id)
    res.json(deleted)
}

const authenticate = async (_req: Request, res: Response) => {
    const user: User = {
        username: _req.body.username,
        password: _req.body.password,
        firstname: _req.body.firstname,
        lastname: _req.body.lastname
    }
    try {
        const u = await store.authenticate(user.username, user.password)
        var token = jwt.sign({ user: u }, token_secret)
        res.json(token)
    } catch(err) {
        res.status(401)
        res.json(err)
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/{:id}', show)
    app.post('/users', create)
    app.delete('/users', destroy)
    app.post('/users/authenticate', authenticate)
}



export default userRoutes