import { IHookahModel } from './hookah';

export interface IOrderModel {
  id?: number;
  customer: string;
  date: Date;
  amountPeople: number;
  hookahs?: Array<IHookahModel>;
}

export class OrderModel {
  customer: string;
  date: Date;
  amountPeople: number;
  hookahs?: Array<IHookahModel>;

  constructor(data: IOrderModel) {
    this.customer = data.customer;
    this.date = data.date;
    this.amountPeople = data.amountPeople;
    this.hookahs = data.hookahs || [];
  }
}