import { join } from 'path';
import { promisify } from 'util';
import { statSync, readFileSync, readdirSync } from 'fs';
import { createPool} from 'mysql';
import { IDatabaseDriver, IMysqlDataConnection } from '../utils';

class PoolConnection implements IDatabaseDriver {
  private readonly pool;

  /** Config for PROD and STAGE environment */
  private readonly config: IMysqlDataConnection = {
    host: 'mysql-container',
    user:  process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database:  process.env.MYSQL_DATABASE,
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
      console.log('\nErr: ', err.message);
      throw { err }
    }
  };

  runMigrateFile = async (filename: string, type: string): Promise<boolean> => {
    const DIR = type === 'seed' ? 'build/seed' : 'build/scripts';
    let listFileForMigrate = [];

    if (filename === '*') {
      readdirSync(DIR)
        .sort()
        .forEach((file => {
          const absolutePath = join(DIR, file);
          this.isFileSQL(absolutePath) ? listFileForMigrate.push(absolutePath) : false;
        }))
    } else {
      const absolutePath: string = join(DIR, filename);
      this.isFileSQL(absolutePath) ? listFileForMigrate.push(absolutePath) : false;
    }

    for(let file of listFileForMigrate) {
      const sqlQuery = readFileSync(file, 'utf8');
      await this.pool.query(sqlQuery);
    }
    return true;
  };

  isFileSQL = (path: string) => {
    return statSync(path).isFile() && /\.sql$/.test(path);
  };

  closeConnection() {
    if (this.pool) {
      this.pool.end();
    }
  };
}

export default PoolConnection;
