import { join } from 'path';
import { promisify } from 'util';
import { statSync, readFileSync } from 'fs';
import { createPool} from 'mysql';
import { IDatabaseDriver, IMysqlDataConnection } from '../utils';

class PoolConnection implements IDatabaseDriver {
  private readonly pool;

  /** Config for PROD and STAGE environment */
  private readonly config: IMysqlDataConnection = {
    host: 'mysql-container',
    user:  process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database:  process.env.DB_NAME,
    multipleStatements: true
  };

  /**
   * We will transfer the config when testing
   * @param {IDataConnection} data
   */
  constructor(data?: IMysqlDataConnection) {
      this.pool = createPool(data || this.config);
      this.pool.query = promisify(this.pool.query);
  }

  query = async (sqlScript: string, arg: object | Array<any>) => {
    try {
       return await this.pool.query(sqlScript, arg);
    } catch (err) {
      console.log('\n\n Err: ', err);
      console.log(' ------------------------ ');
      throw { err }
    }
  };

  runSQLFile = async (filename: string) => {
    const absolutePath: string = join(`build/scripts`, filename);
    const isFile: boolean = statSync(absolutePath).isFile() && /\.sql$/.test(absolutePath);

    if (isFile) {
      const sqlQuery = readFileSync(absolutePath, 'utf8');
      await this.pool.query(sqlQuery);
    }
  };

  closeConnection() {
    if (this.pool) {
      this.pool.end();
    }
  };
}

export default PoolConnection;
