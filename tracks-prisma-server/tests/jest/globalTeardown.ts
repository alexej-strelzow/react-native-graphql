const util = require('util');
const exec = util.promisify(require('child_process').exec);

export default async () => {
  await (global as any).httpServer.server.close();
  console.log('Server exited');

  console.log('Resetting test database...');
  await exec('npm run db:test:reset');
  await exec('npm run db:test:create');

  console.log('Done!');
};
