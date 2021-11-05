import client from '../database'

export type Product = {
   id?: number;
   name: string;
   price: number;  
};

export class ProductStore {
    async index():Promise<Product[]> {
     try {
        const conn = await client.connect();
        const sql = 'SELECT * FROM products';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
     } catch (err) {
       throw new Error(`Cannot get products. Error: ${err}`)       
 } 
}

async show(id: number): Promise<Product> {
    try {
        const sql = 'SELECT * FROM products WHERE id=($1)';
        const conn = await client.connect();
        const result = await conn.query(sql, [id]);
        conn.release();
        const product = result.rows[0]

    return product
    } catch (err) {
    throw new Error(`Could not get product ${id}. Error: ${err}`);
    }
}

async create(product: Product): Promise<Product> {
    try {
    const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
    const conn = await client.connect();
    const result = await conn.query(sql, [product.name, product.price]);
    const added_product = result.rows[0];

    conn.release();

    return added_product;
    } catch (err)  {
        throw new Error(`Could not add new product ${product.name}. Error: ${err}`);
    }
}

async delete(id: string): Promise<Product> {
    try {
    const sql = 'DELETE FROM products WHERE id=($1)';
    const conn = await client.connect();
    const result = await conn.query(sql, [id]);

    const product = result.rows[0];

    conn.release();

    return product
    } catch (err) {
        throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
}

}
