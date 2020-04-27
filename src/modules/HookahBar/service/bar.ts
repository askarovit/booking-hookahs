import { pool } from 'connector';
import { IBarModel, BarModel } from 'model';
import queries from './queries/bar';

export interface IBarService {
  getBars(): Promise<Array<IBarModel>>,
  deleteBar(title: string): Promise<{affectedRows: boolean}>,
  createBar(IBarModel): Promise<IBarModel>;
}

class BarService implements IBarService {

  public async getBars(): Promise<Array<IBarModel>> {
    const data: Array<IBarModel> = await pool.query(queries.getListBars);
    return data;
  };

  public async deleteBar(title: string): Promise<{affectedRows: boolean}> {
    const { affectedRows } = await pool.query(queries.deleteBar, { title });
    return { affectedRows: !!affectedRows };
  }

  public async createBar(body: IBarModel): Promise<IBarModel> {
    const bar: IBarModel = new BarModel(body);
    const { insertId } = await pool.query(queries.createBar,   { ...bar });
    return { ...bar, id: insertId };
  }
}

export default new BarService();