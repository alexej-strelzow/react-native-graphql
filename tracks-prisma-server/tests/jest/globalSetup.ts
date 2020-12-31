const util = require('util');
const exec = util.promisify(require('child_process').exec);

import { server } from '../../src/server';

export default async () => {
  await exec('npm run db:test:create');

  const options = {
    port: process.env.PORT || 4000,
    endpoint: '/graphql',
    subscriptions: '/subscriptions'
  };

  const instance = await server.listen(options);
  (global as any).httpServer = instance;

  console.log(`🚀 Server ready at ${ instance.url }`);
  console.log(`🚀 Subscriptions ready at ${ instance.subscriptionsUrl }`);
};
