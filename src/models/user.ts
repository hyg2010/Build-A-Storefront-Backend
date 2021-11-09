import bcrypt from 'bcrypt'
import client from "../database"
import { ProductStore } from './product'

export type User = {
  id?: number;
  username: string;
  firstname: string;
  lastname: string; 
  password: string;
}

export class UserStore {
    delete(id: any) {
        throw new Error('Method not implemented.')
    }
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
   } catch (err) {
     throw new Error(`Cannot get User. Error: ${err}`)       
} 
}
async show(id: number): Promise<User> {
  try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
  return result.rows[0]
  } catch (err) {
      throw new Error(`Could not get user ${id}. Error: ${err}`)
  }
}

async create (UserStore: User): Promise<User> {
  try {
    const conn = await client.connect()
    const sql = 'INSERT INTO users (username, firstname, lastname, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
    const pepper = process.env.BCRYPT_PASSWORD || ''
    const saltRounds = process.env.SALT_ROUNDS || '';

    const hash = bcrypt.hashSync(
      UserStore.password + pepper,
      parseInt(saltRounds)
    );

    const result = await conn.query(sql, [UserStore.username, hash])
    const user = result.rows[0]

    conn.release()

    return user
  } catch(err) {
    throw new Error(`unable create user (${UserStore.username}): ${err}`)
  }

}
async authenticate(username: string, password: string): Promise<User | null> {
  const conn = await client.connect()
  const sql = 'SELECT password_digest FROM users WHERE username=($1)';

  const result = await conn.query(sql, [username])

  const pepper = process.env.BCRYPT_PASSWORD || ''
  console.log(password+pepper)

  if(result.rows.length) {

    const user = result.rows[0]

    console.log(user)

    if (bcrypt.compareSync(password+pepper, user.password_digest)) {
      return user
    }
  }

  return null
}

}


