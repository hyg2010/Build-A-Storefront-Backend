import express, { Request, Response } from 'express'
import verifyAuthToken from '../middleware/verifyauthtoken';
import { Order, OrderStore } from '../models/order'


const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    const orders = await store.index()
    res.json(orders);
}

const show = async (_req: Request, res: Response) => {
    console.log(_req.params)
    const orders = await store.show(_req.body.id)
    res.json(orders)
}

const create = async (req: Request, res: Response) => {
    const order: Order = {
        user_id: req.body.user_id,
        status: "active"
    }
    try {
        const newOrder = await store.create(order);
         res.json(newOrder);
    } catch(err) {
        res.status(400);
        res.json(err);
    }
};

const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.id
    const productId: string = _req.body.productId
    const quantity: number = parseInt(_req.body.quantity)


try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct)
} catch(err) {
    res.status(400)
    res.json(err)
}
}
const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create)
    app.delete('/orders', verifyAuthToken, destroy);
    // add product
    app.post('/orders/:id/products', addProduct)
}

export default orderRoutes
