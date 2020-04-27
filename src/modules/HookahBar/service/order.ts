import { pool } from 'connector';
import { IOrderModel, OrderModel, IHookahModel } from 'model';
import queries from './queries/order';

export interface IListCustomers {
  customer: string,
  date: Date
}

export interface IFreeHookahQuery {
  from: Date,
  to: Date,
  amount_people: number
}

export interface IOrderService {
  getListCustomers(): Promise<Array<IListCustomers>>,
  makeOrder(body: IOrderModel): Promise<{ message: string }>,
  getFreeHookah(body: IFreeHookahQuery): Promise<Array<IHookahModel>>;
}

class OrderService implements IOrderService{

  public async getListCustomers(): Promise<Array<IListCustomers>> {
    const data: Array<IListCustomers> = await pool.query(queries.getListCustomer);
    return data;
  };

  public async makeOrder(body): Promise<{ message: string }> {
    const { customer, date, amount_people } = body;
    const data: Array<Array<{ message: string }>> = await pool.query(queries.makeOrder, [customer, date, amount_people]);
    return data[0][0];
  }

  public async getFreeHookah(body): Promise<Array<IHookahModel>> {
    const { from, to, amount_people } = <IFreeHookahQuery>body;
    const data: Array<Array<IHookahModel>> =
      await pool.query(queries.getFreeHookah, [from, to, amount_people]);
    return data[0];
  }
}

export default new OrderService();