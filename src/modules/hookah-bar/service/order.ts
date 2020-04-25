import { pool } from 'connector';
import { IOrderModel, OrderModel } from 'model';
import queries from './queries/order';

class OrderService {

  public async getListCustomers(): Promise<Array<{customer:string, date: Date}>> {
    const data = await pool.query(queries.getListCustomer);
    return data;
  };

  public async makeOrder(body): Promise<any> {
    const { customer, date, amount_people } = body;
    const data = await pool.query(queries.makeOrder, [customer, date, amount_people]);
    return data;
  }

  public async getFreeHookah(body): Promise<any> {
    const { from, to, amount_people } = body;
    const data = await pool.query(queries.getFreeHookah, [from, to, parseInt(amount_people, 10)]);
    return data;
  }
}

export default new OrderService();