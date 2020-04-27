export interface IBarModel {
  id: number;
  title: string
}

export class BarModel {
  title: string;

  constructor(data: IBarModel) {
    this.title = data.title;
  }
}