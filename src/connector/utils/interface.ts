export interface IDataConnection {
  host: string;
  user: string;
  password: string;
  database: string;
}

export interface IMysqlDataConnection extends IDataConnection {
  ssl?: object;
  multipleStatements?: boolean;
}

export interface IDatabaseDriver {
  query(req: string, arg?: object | Array<string | number>);
  runMigrateFile(req: string, type: string);
  closeConnection(): void;
}