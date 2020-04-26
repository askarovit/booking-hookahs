import { pool } from 'connector';
import { IOrderModel, OrderModel, IHookahModel } from 'model';
import queries from './queries/order';

class OrderService {

  public async getListCustomers(): Promise<Array<{customer:string, date: Date}>> {
    const data = await pool.query(queries.getListCustomer);
    return data;
  };

  public async makeOrder(body): Promise<{ message: string }> {
    const { customer, date, amount_people } = body;
    const data: Array<Array<{ message: string}>> = await pool.query(queries.makeOrder, [customer, date, amount_people]);
    return data[0][0];
  }

  public async getFreeHookah(body): Promise<Array<IHookahModel>> {
    const { from, to, amount_people } = body;
    const data: Array<Array<IHookahModel>> =
      await pool.query(queries.getFreeHookah, [from, to, parseInt(amount_people, 10)]);
    return data[0];
  }
}

export default new OrderService();