import app from './src/app';
import { dbConnection, pool } from 'connector';

const preconfiguration: Array<Promise<any>> = [];

preconfiguration.push(dbConnection());
preconfiguration.push(pool.runSQLFile('create_tables.sql'));
preconfiguration.push(pool.runSQLFile('make_order_hookah_procedure.sql'));
preconfiguration.push(pool.runSQLFile('get_free_hookah_procedure.sql'));

Promise.all(preconfiguration)
  .then(() => {
    app.listen(process.env.SERVER_PORT || 9996);
    console.log('Server ready ...');
  })
  .catch(err => {
    console.log(`[${Date.now()}] : [SERVER START ERROR] - ${ err } \n`);
  });