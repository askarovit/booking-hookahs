import { HookahModel, IHookahModel } from 'model';
import { pool } from 'connector';
import queries from './queries/hookah';

class BarService {

  public async getHookahs(): Promise<Array<IHookahModel>> {
    const data: Array<IHookahModel> = await pool.query(queries.getListHookahs);
    return data;
  };

  public async deleteHookah(body: { title: string, amount_tube: number }) {
    const { affectedRows } = await pool.query(queries.deleteHookah, [body.title, body.amount_tube]);
    return  { affectedRows: !!affectedRows };
  }

  public async createHookah(body: IHookahModel) {
    const hookah = new HookahModel(body);
    const { insertId }: any = await pool.query(queries.createHookah, { ...hookah });
    return { ...hookah, id: insertId };
  }
}

export default new BarService();