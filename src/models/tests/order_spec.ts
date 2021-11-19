import { OrderStore } from '../order';
import { UserStore } from '../user';
import { ProductStore } from '../product';

const ostore = new OrderStore();
const productstore = new ProductStore();
const userstore = new UserStore();

describe('Order Model', () => {
    beforeAll(async () => {
        await userstore.create({
            username: 'henok1',
            password: 'password123'
        });

        await productstore.create({
            name: 'newproduct',
            price: 4 
        });

        await ostore.create({
            user_id: 'henok1',
            status: 'active',    
        });
        await ostore.addProduct({
            quantity: 1,
            order_id: '1',
            product_id: '1' 
        });
    });

  it('should have an index method', () => {
    expect(ostore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(ostore.show).toBeDefined();
  });

  it('should have a create method to add order', () => {
    expect(ostore.create).toBeDefined();
  });

  it('should add product method', () => {
      expect(ostore.addProduct).toBeDefined();
  })
  it('should have a delete method', () => {
    expect(ostore.delete).toBeDefined();
  });

  it('create method should add an order', async () => {
    const result = await ostore.create({
        user_id: 'henok1',
        status: 'active',
    });
    expect(result).toEqual({
        user_id: 'henok1',
        status: 'active'
    });

it('index method should return a list of orders', async () => {
  const result = await ostore.index();
  expect(result).toEqual([{
    id: 1,
    status: 'active',
    user_id: 'henok1'
  }]);
});
  
it('should show the correct order', async () => {
    const result = await ostore.show(1);
    expect(result).toEqual({
        id: 1,
        status: 'active',
        user_id: 'henok1'
    });
  });

  it('addProduct method should add a product', async () => {
    const result = await ostore.addProduct({
      quantity: 1,
      order_id: '1',
      product_id: '1'
    });
  expect(result).toEqual({
    id: 1,
    quantity: 1,
    order_id: '1',
    product_id: '1'
  });
});

it('delete method should remove the product', async () => {
  ostore.delete(1);
  const result = await ostore.index()
  expect(result).toEqual([]);
});
  

 
});
});
