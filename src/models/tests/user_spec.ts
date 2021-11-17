import { UserStore } from '../user';

const store = new UserStore();

describe("User Model", () => {
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
  })
  it('should have an authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('create method should add a user', async () => {
    const user = await store.create({
      username: 'henok1',
      password: 'password123'
   
 });
expect(user.username).toMatch('henok1');
  });

  it('authenticate the user', async () => {
    const authenticateUser = await store.authenticate('henok1','password123');
    expect(authenticateUser).toBeTruthy
  });



it('show method should return the correct user', async () => {
  const result = await store.show('1');
  expect(result).toEqual({
    id: 1,
    username: 'henok1'
  });

it('delete method should remove the user', async () => {
  store.delete(1);
  const result = await store.index()

  expect(result).toEqual([]);
});


});
});
