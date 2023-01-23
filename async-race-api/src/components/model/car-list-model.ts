import { garage, winners } from '../../constants/constants';
import { CarRace, Cars } from '../../types';
import API from '../api/api';
import CarFactory from '../car-factory/car-factory';
import CarItemModel from './car-item-model';

export default class CarListModel extends EventTarget {
  private cars: Cars = [];

  private carItemsValue: Array<CarItemModel> = [];

  private selectedCarItemValue: CarItemModel;

  private numberPageValue: number = 1;

  private numberOfCarsValue: number = 0;

  private winnerData: CarRace;

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

  public get winner(): CarRace {
    return this.winnerData;
  }

  onSetWinner() {
    this.api.getOne(winners, this.winnerData.id)
      .then((winner) => {
        const updateWinner = {
          wins: winner.wins + 1,
          time: Math.min(this.winnerData.time, winner.time),
        };
        this.api.update(winners, this.winnerData.id, updateWinner);
      })
      .catch(() => {
        const newWinner = {
          id: this.winnerData.id,
          wins: 1,
          time: this.winnerData.time,
        };
        this.api.post(winners, newWinner);
      })
      .then(() => {
        this.dispatchEvent(new CustomEvent('post-new-winner'));
      });
  }

  private onItemSelected(event: Event) {
    this.selectedCarItemValue = event.target as CarItemModel;
    this.dispatchEvent(new CustomEvent('item-selected'));
  }

  private onItemDeleted(): void {
    this.loadCars();
    this.dispatchEvent(new CustomEvent('car-deleted'));
  }

  public startCars(): void {
    let resolved = false;
    const promises = this.carItems.map((carItem) => {
      const aCarItem = carItem;
      aCarItem.isStartEngineDisabled = true;

      return carItem.startRace().then((carRace) => {
        if (!resolved) {
          resolved = true;
          this.winnerData = carRace;
          this.onSetWinner();
        }
      });
    });

    Promise.allSettled(promises).then(() => {
      if (!resolved) {
        global.console.error('All cars are crashed.');
      }

      global.console.log('race-end');
      this.dispatchEvent(new CustomEvent('race-end'));
    });
  }

  public stopCars() {
    this.carItems.forEach((carItem) => {
      carItem.comeBackToStart();
      const aCarItem = carItem;
      aCarItem.isStartEngineDisabled = false;
    });
  }

  public generateCars() {
    const numberGeneratedCars = 100;
    const carFactory = CarFactory.create();
    const promises = [];

    for (let i = 1; i <= numberGeneratedCars; i += 1) {
      const carData = carFactory.generateCar();
      promises.push(this.api.post(garage, carData));
    }

    Promise.all(promises)
      .then(() => {
        this.loadCars();
      });
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
