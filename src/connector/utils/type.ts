
export type PoolConnectionType = {
  query(req: string, arg?: any);
  runSQLFile(filename: string);
  closeConnection();
}