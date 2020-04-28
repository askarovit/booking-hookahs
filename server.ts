import app from './src/app';
import { dbConnection, pool } from 'connector';

const preconfiguration: Array<Promise<{}>> = [];

preconfiguration.push(dbConnection());
preconfiguration.push(pool.runMigrateFile('*', 'scripts'));

Promise.all(preconfiguration)
  .then(() => {
    app.listen(process.env.SERVER_PORT || 9996);
    console.log(`[NODE ENV - ${process.env.NODE_ENV}] \nServer ready ...`);
  })
  .catch(err => {
    console.log(`[${Date.now()}] : [SERVER START ERROR] - ${ err } \n`);
  });