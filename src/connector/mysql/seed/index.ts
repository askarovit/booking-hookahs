import { dbConnection, pool } from 'connector';

if (!pool) {
  dbConnection()
    .then(async pool => {
      await pool.runMigrateFile('*', 'seed');
      pool.closeConnection();
    })
    .catch(err => {
      console.log('\n Failed to connect to Mysql Database.', err.message)
    });
}

