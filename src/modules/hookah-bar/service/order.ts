import { pool } from 'connector';
import { IOrderModel, OrderModel } from 'model';
import queries from './queries/order';

class OrderService {

  public async getListCustomers(): Promise<Array<{customer:string, date: Date}>> {
    const data = await pool.query(queries.getListCustomer);
    return data;
  };

  public async makeOrder(amount_people: number): Promise<any> {
    const data = await pool.query(queries.makeOrder, [amount_people]);
    return data;
  }
}

export default new OrderService();