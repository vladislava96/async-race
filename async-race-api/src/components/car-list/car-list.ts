import './car-list.css';
import Car from '../car/car';
import CarListModel from '../model/car-list-model';
import CarItem from '../car-item/car-item';

export default class CarList {
  private car: Car;

  private carList: HTMLUListElement;

  private carItems: CarItem[] = [];

  public constructor(private element: HTMLElement, private model: CarListModel) {
    this.onCarsUpdated = this.onCarsUpdated.bind(this);

    this.car = new Car();
    this.initialize();
  }

  //   const row = document.createElement('div');
  //   const selectButton = document.createElement('button');
  //   selectButton.textContent = 'select';
  //   const removeButton = document.createElement('button');
  //   removeButton.textContent = 'remove';
  //   const carName = document.createElement('span');

  //   row.append(selectButton, removeButton, carName);

  // eslint-disable-next-line class-methods-use-this
  private initialize(): void {
    this.carList = document.createElement('ul');
    this.carList.className = 'car-list';
    this.element.appendChild(this.carList);

    this.model.addEventListener('cars-updated', this.onCarsUpdated);
  }

  public destroy(): void {
    this.model.removeEventListener('cars-updated', this.onCarsUpdated);
    this.destroyCarItems();
  }

  private onCarsUpdated(): void {
    this.carList.innerHTML = '';
    this.destroyCarItems();

    this.model.carItems.forEach((carItemModel) => {
      const carListItem = document.createElement('li');
      carListItem.className = 'car-list-item';

      const carItem = new CarItem(carListItem, carItemModel, this.car);
      this.carItems.push(carItem);

      this.carList.appendChild(carListItem);
    });
  }

  private destroyCarItems() {
    this.carItems.forEach((carItem) => carItem.destroy());
    this.carItems = [];
  }

  public startCars() {
    this.carItems.forEach((carItem) => {
      carItem.startEngine();
    });
  }

  public stopCars() {
    this.carItems.forEach((carItem) => {
      carItem.stopEngine();
    });
  }
}
