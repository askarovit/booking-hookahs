
export type PoolConnectionType = {
  query(req: string, arg?: object | Array<string | object>);
  runMigrateFile(filename: string, type: string);
  closeConnection();
}