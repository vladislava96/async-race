import { ICar } from '../../types';
import API from '../api/api';

export default class CarItemModel extends EventTarget {
  public constructor(private api: API, private car: ICar) {
    super();
  }

  public get id(): number {
    return this.car.id;
  }

  public get name(): string {
    return this.car.name;
  }

  public get color(): string {
    return this.car.color;
  }

  public select(): void {
    this.dispatchEvent(new CustomEvent('selected'));
  }
}
