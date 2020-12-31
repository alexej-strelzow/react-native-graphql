import { request } from 'graphql-request'
import { signin, signup } from './graphql'
import { getConfig } from './helpers'

const config = getConfig();

describe('Users', () => {

  test('successfully create a user', async () => {
    try {
      const user = {
        name: 'user 1',
        email: 'u1@g.com',
        password: 'user 1',
      };
      const data: any = await request(config.url, signup, user);

      expect(data).toHaveProperty('signup');
      expect(data.signup.user.name).toEqual(user.name);
    } catch (e) {
      console.log('error', e);
    }
  });

  test('successfully get token on login', async () => {
    const credentials = {
      email: 'u1@g.com',
      password: 'user 1',
    };
    const data: any = await request(config.url, signin, credentials);

    expect(data).toHaveProperty('signin');
    expect(data.signin.accessToken).toBeDefined();
  });

});
