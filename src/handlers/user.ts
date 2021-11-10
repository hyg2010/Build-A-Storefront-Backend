import express, {Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken';


const store = new UserStore()
const token_secret = process.env.TOKEN_SECRET!;


const index = async (_req: Request, res: Response) => {
   try {
    const users = await store.index()
    res.json(users)
} catch (err) {
    res.status(400);
    res.json(err);
}
};
const show = async (_req: Request, res: Response) => {
    const user = await
    store.show(_req.body.id)
    res.json(user)
}

const create = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const newUser = await store.create(user)
        res.json(newUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
      username: req.body.username,
      password: req.body.password,
    }
    try {
        const u = await store.authenticate(user.username, user.password)
        var token = jwt.sign({ user: u }, token_secret);
        res.json(token)
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
  }
const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/{:id}', show)
    app.post('/users', create)
    app.post('/users/authenticate/:id', authenticate)
}


export default userRoutes