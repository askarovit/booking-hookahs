export interface IHookahModel {
  id: number;
  title: string,
  amount_tube: number,
  bar_id: number | null
}

export class HookahModel  {
  title: string;
  amount_tube: number;
  bar_id: number | null;

  constructor(data: IHookahModel) {
    this.title = data.title;
    this.amount_tube = data.amount_tube;
    this.bar_id = data.bar_id
  }
}