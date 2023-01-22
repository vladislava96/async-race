import './car-list.css';
import Car from '../car/car';
import CarListModel from '../model/car-list-model';
import CarItem from '../car-item/car-item';

export default class CarList {
  private car: Car;

  private carList: HTMLUListElement;

  private carItems: CarItem[] = [];

  private pageNumber: HTMLSpanElement;

  private title: HTMLHeadingElement;

  private buttonNext: HTMLButtonElement;

  private buttonPrev: HTMLButtonElement;

  public constructor(private element: HTMLElement, private model: CarListModel) {
    this.onCarsUpdated = this.onCarsUpdated.bind(this);

    this.car = new Car();
    this.onButtonNext = this.onButtonNext.bind(this);
    this.onButtonPrev = this.onButtonPrev.bind(this);
    this.initialize();
  }

  private initialize(): void {
    const garageInfo = this.renderGarageInfo();
    this.carList = document.createElement('ul');
    this.carList.className = 'car-list';

    this.model.addEventListener('cars-updated', this.onCarsUpdated);

    const paginationButtons = this.createPaginationButtons();

    this.element.append(garageInfo, this.carList, paginationButtons);
  }

  // eslint-disable-next-line class-methods-use-this
  renderGarageInfo() {
    const garageInfo = document.createElement('div');

    this.title = document.createElement('h2');
    this.title.textContent = `Garage (${this.model.numberOfCars})`;

    this.pageNumber = document.createElement('span');
    this.pageNumber.textContent = `Page №${this.model.numberPage}`;

    garageInfo.append(this.title, this.pageNumber);

    return garageInfo;
  }

  // eslint-disable-next-line class-methods-use-this
  createPaginationButtons() {
    const paginationButtons = document.createElement('div');
    this.buttonPrev = document.createElement('button');
    this.buttonPrev.textContent = 'Prev';
    this.buttonPrev.addEventListener('click', this.onButtonPrev);

    this.buttonNext = document.createElement('button');
    this.buttonNext.textContent = 'Next';
    this.buttonNext.addEventListener('click', this.onButtonNext);

    paginationButtons.append(this.buttonPrev, this.buttonNext);
    return paginationButtons;
  }

  onButtonNext() {
    if (!this.model.isLastPage) {
      this.model.numberPage += 1;
      this.pageNumber.textContent = `Page №${this.model.numberPage}`;
    }
  }

  onButtonPrev() {
    if (!this.model.isFirstPage) {
      this.model.numberPage -= 1;
      this.pageNumber.textContent = `Page №${this.model.numberPage}`;
    }
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

    this.title.textContent = `Garage (${this.model.numberOfCars})`;
    this.buttonNext.disabled = this.model.isLastPage;
    this.buttonPrev.disabled = this.model.isFirstPage;
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
