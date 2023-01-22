import { Cars } from '../../types';
import API from '../api/api';
import CarItemModel from './car-item-model';

export default class CarListModel extends EventTarget {
  private cars: Cars = [];

  private carItemsValue: Array<CarItemModel> = [];

  private selectedCarItemValue: CarItemModel;

  private numberPageValue: number = 1;

  private numberOfCarsValue: number = 0;

  public get carItems(): ReadonlyArray<CarItemModel> {
    return this.carItemsValue;
  }

  public constructor(private api: API) {
    super();
    this.onItemSelected = this.onItemSelected.bind(this);
    this.onItemDeleted = this.onItemDeleted.bind(this);
    this.loadCars();
  }

  public get numberOfCars(): number {
    return this.numberOfCarsValue;
  }

  public get numberOfPages(): number {
    return Math.ceil(this.numberOfCars / 7);
  }

  public get selectedCarItem(): CarItemModel {
    return this.selectedCarItemValue;
  }

  public set numberPage(numberPage: number) {
    this.numberPageValue = numberPage;
    this.loadCars();
  }

  public get numberPage(): number {
    return this.numberPageValue;
  }

  public get isFirstPage(): boolean {
    return this.numberPage === 1;
  }

  public get isLastPage(): boolean {
    return this.numberPage >= this.numberOfPages;
  }

  private onItemSelected(event: Event) {
    this.selectedCarItemValue = event.target as CarItemModel;
    this.dispatchEvent(new CustomEvent('item-selected'));
  }

  private onItemDeleted(): void {
    this.loadCars();
  }

  public async loadCars(): Promise<void> {
    const cars = await this.api.getCarsOnPage(this.numberPageValue);
    this.cars = cars;
    this.carItemsValue = cars.map((car) => {
      const carItemModel = new CarItemModel(this.api, car);
      carItemModel.addEventListener('selected', this.onItemSelected);
      carItemModel.addEventListener('deleted', this.onItemDeleted);

      return carItemModel;
    });

    const data = await this.api.getCars();
    this.numberOfCarsValue = data.length;

    this.dispatchEvent(new CustomEvent('cars-updated'));
  }
}
