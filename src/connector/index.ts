import { PoolConnectionType, IDataConnection } from './utils';

export let pool: PoolConnectionType | null;

export const dbConnection = async (data?: IDataConnection): Promise<PoolConnectionType | null> => {
  if (process.env.MYSQL_DRIVER) {
    const driver = require('./mysql').default;
    pool = new driver(data);
  }

  return Boolean(pool) ?
         Promise.resolve(pool) :
         Promise.reject('Not found any database driver.')
};

export const dbConnectionClose = async (): Promise<void> => {
  if (Boolean(pool)) {
    pool.closeConnection();
    pool = null;
  }
};