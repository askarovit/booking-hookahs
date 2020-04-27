
export type PoolConnectionType = {
  query(req: string, arg?: any);
  runMigrateFile(filename: string, type: string);
  closeConnection();
}