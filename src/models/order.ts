import Client from '../database'

export type Order = {
    id: number;
    status: string;
    user_id: string;
}

export class OrderStore {
    async index(): Promise<Order[]> {
     try {
        const conn = await Client.connect()
        const sql = 'SELECT * FROM orders';
        const result = await conn.query(sql)
        conn.release()
        return result.rows
     } catch (err) {
       throw new Error(`Cannot get order. Erorr: ${err}`)       
 } 
}


async show(id: string): Promise<Order> {
    try {
        const sql = 'SELECT * FROM orders WHERE id=($1)'
        const conn = await Client.connect()
        const result = await conn.query(sql, [id]);
        conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not get product ${id}. Error: ${err}`)
    }
}

async create(OrderStore: Order): Promise<Order> {
    try {
    const sql = 'INSERT INTO Orders (id, status, user_id) VALUES($1, $2, $3) RETURNING *';
    const conn = await Client.connect()
    const result = await conn.query(sql, [OrderStore.id, OrderStore.status, OrderStore.user_id])

    const order = result.rows[0]

    conn.release()

    return order
    
    } catch (err)  {
        throw new Error(`Could not add new order ${OrderStore.id}. Error: ${err}`)
    }
}



async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
    try {
      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      const conn = await Client.connect()
      const result = await conn.query(sql, [quantity, orderId, productId])
      const order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
    }
}
}