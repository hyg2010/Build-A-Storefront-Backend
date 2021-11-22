import app from '../../server';
import supertest from 'supertest'
import { Order } from '../order';
import { User } from '../user';
import { Product } from '../product';


const request = supertest(app);

//test for successful resized endpoint with query parameters

it('testing product endpoint for invalid product', async () => {
    const response = await request.get(
      '/products?/name=shoes&price=1'
    );
    expect(response.status).toBe(200);
  });




