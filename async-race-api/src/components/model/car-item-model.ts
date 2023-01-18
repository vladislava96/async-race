import { ICar } from '../../types';
import API from '../api/api';

export default class CarItemModel {
  public constructor(private api: API, private car: ICar) {
  }

  get name(): string {
    return this.car.name;
  }

  get color(): string {
    return this.car.color;
  }
}
