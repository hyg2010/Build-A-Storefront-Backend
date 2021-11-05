import { Product, ProductStore } from '../product';
import app from '../../server';
import { idText } from 'typescript';

const store = new ProductStore();
let idnumber: number


describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined(); 
  });

  it('create method should add a product', async () => {
    const newProduct = await store.create({
      name: 'shoes',
      price: 19
    });
    idnumber = newProduct.id as number
    expect(newProduct).toEqual({
      id: idnumber,
      name: 'shoes',
      price: 19
    });
  });


  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      id: idnumber,
      name: 'shoes',
      price: 19
    }]);
  });
  it('delete method should remove the product', async () => {
    await store.delete('');
    const result = await store.index()

    expect(result).toEqual([]);

  });


});
