import express, { Request, Response } from 'express'

import { Order, OrderStore } from '../models/order'

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create)
    // add product
    app.post('/orders/:id/products', addProduct)
}

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
    const orders = await store.index()
    res.json(orders)
}

const show = async (_req: Request, res: Response) => {
    console.log(_req.params)
    const order = await store.show(_req.params.id)
    res.json(order)
}

const create = async (_req: Request, res: Response) => {
    const order: Order = {
        id: _req.body.id,
        user_id: _req.body.user_id,
        status: "active", 
    }
    try {
        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.id
    const productId: string = _req.body.productId
    const quantity: number = parseInt(_req.body.quantity)


try {
    const addedProduct = await store.addProduct(quantity, orderId, productId)
    res.json(addedProduct)
} catch(err) {
    res.status(400)
    res.json(err)
}
}


export default orderRoutes
