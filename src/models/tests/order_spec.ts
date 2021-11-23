import { OrderStore } from '../order';
import { UserStore } from '../user';
import { ProductStore } from '../product';


const orderstore = new OrderStore();
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
    });
    
  it('should have an index method', () => {
    expect(orderstore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(orderstore.show).toBeDefined();
  });

  it('should have a create method to add order', () => {
    expect(orderstore.create).toBeDefined();
  });

  it('should add product method', () => {
    expect(orderstore.addProduct).toBeDefined();
  })
  it('should have a delete method', () => {
    expect(orderstore.delete).toBeDefined();
  });

  it('create method should add an order', async () => {
    const result = await orderstore.create({
        user_id: 'henok1',
        status: 'active',
    });
    expect(result).toEqual({
        user_id: 'henok1',
        status: 'active'
    });

it('index method should return a list of orders', async () => {
  const result = await orderstore.index();
  expect(result).toEqual([{
    id: 1,
    status: 'active',
    user_id: 'henok1'
  }]);
});
  
it('should show the correct order', async () => {
    const result = await orderstore.show(1);
    expect(result).toEqual({
        id: 1,
        status: 'active',
        user_id: 'henok1'
    });
  });

  it('addProduct method should add a product', async () => {
    const result = await orderstore.addProduct({
      quantity: 1,
      order_id: '1',
      product_id: '1'
    });
  expect(result).toEqual({
    id: 1,
    quantity: 1,
    order_id: 1,
    product_id: 1,
    user_id: 1,
    status: 'active'
  });
});

it('delete method should remove the product', async () => {
orderstore.delete(1);
  const result = await orderstore.index()
  expect(result).toEqual([]);
});
  

 
});
});
