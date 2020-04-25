
export interface IDataConnection {
  host: string,
  user: string,
  password: string,
  database: string
}

export interface IMysqlDataConnection extends IDataConnection {
  ssl?: object,
  multipleStatements?: boolean
}

export interface IDatabaseDriver {
  query(req: string, arg?: any);
  runSQLFile(req: string, body: any);
  closeConnection();
}