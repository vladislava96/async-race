import { Cars } from '../../types';
import API from '../api/api';
import CarItemModel from './car-item-model';

export default class CarListModel extends EventTarget {
  private cars: Cars = [];

  private carItemsValue: Array<CarItemModel> = [];

  private selectedCarItemValue: CarItemModel;

  public get carItems(): ReadonlyArray<CarItemModel> {
    return this.carItemsValue;
  }

  public constructor(private api: API) {
    super();
    this.onItemSelected = this.onItemSelected.bind(this);
    this.loadCars();
  }

  public get selectedCarItem(): CarItemModel {
    return this.selectedCarItemValue;
  }

  private onItemSelected(event: Event) {
    this.selectedCarItemValue = event.target as CarItemModel;
    this.dispatchEvent(new CustomEvent('item-selected'));
  }

  public loadCars(): void {
    this.api.getAllCars().then((cars) => {
      this.cars = cars;
      this.carItemsValue = cars.map((car) => {
        const carItemModel = new CarItemModel(this.api, car);
        carItemModel.addEventListener('selected', this.onItemSelected);

        return carItemModel;
      });

      this.dispatchEvent(new CustomEvent('cars-updated'));
    });
  }
}
