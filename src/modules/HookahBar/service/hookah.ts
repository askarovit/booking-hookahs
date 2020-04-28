import { HookahModel, IHookahModel } from 'model';
import { pool } from 'connector';
import queries from './queries/hookah';

interface IBodyDelete {
    title: string;
    amountTube: number;
}

export interface IHookahService {
  getHookahs(): Promise<Array<IHookahModel>>;
  deleteHookah(IBodyDelete): Promise<{affectedRows: boolean}>;
  createHookah(IHookahModel): Promise<IHookahModel>;
}

class BarService implements IHookahService{

  public async getHookahs(): Promise<Array<IHookahModel>> {
    const data: Array<IHookahModel> = await pool.query(queries.getListHookahs);
    return data;
  };

  public async deleteHookah(body: IBodyDelete): Promise<{affectedRows: boolean}> {
    const { affectedRows } = await pool.query(queries.deleteHookah, [body.title, body.amountTube]);
    return  { affectedRows: !!affectedRows };
  }

  public async createHookah(body: IHookahModel): Promise<IHookahModel> {
    const hookah: IHookahModel = new HookahModel(body);
    const { insertId } = await pool.query(queries.createHookah, {
      'title': hookah.title,
      'bar_id': hookah.barId,
      'amount_tube': hookah.amountTube
    });
    return { ...hookah, id: insertId };
  }
}

export default new BarService();
