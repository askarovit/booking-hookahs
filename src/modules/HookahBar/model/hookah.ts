export interface IHookahModel {
  id?: number;
  title: string;
  amountTube: number;
  barId: number | null;
}

export class HookahModel  {
  title: string;
  amountTube: number;
  barId: number | null;

  constructor(data: IHookahModel) {
    this.title = data.title;
    this.amountTube = data.amountTube;
    this.barId = data.barId
  }
}