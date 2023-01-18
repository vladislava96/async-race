import { ICars } from '../../types';
import API from '../api/api';
import CarItemModel from './car-item-model';

export default class CarListModel extends EventTarget {
  private cars: ICars = [];

  private carItemsValue: Array<CarItemModel> = [];

  public get carItems(): ReadonlyArray<CarItemModel> {
    return this.carItemsValue;
  }

  public constructor(private api: API) {
    super();
    this.loadCars();
  }

  public loadCars(): void {
    this.api.getAllCars().then((cars) => {
      this.cars = cars;
      this.carItemsValue = cars.map((car) => new CarItemModel(this.api, car));

      this.dispatchEvent(new CustomEvent('cars-updated'));
    });
  }
}
