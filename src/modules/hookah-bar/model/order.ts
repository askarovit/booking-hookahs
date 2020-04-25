import { IHookahModel } from './hookah';

export interface IOrderModel {
  id?: number;
  customer: string;
  date: Date;
  amount_people: number;
  hookahs?: Array<IHookahModel>;
}

export class OrderModel {
  customer: string;
  date: Date;
  amount_people: number;
  hookahs?: Array<IHookahModel>;

  constructor(data: IOrderModel) {
    this.customer = data.customer;
    this.date = data.date;
    this.amount_people = data.amount_people;
    this.hookahs = data.hookahs || [];
  }
}