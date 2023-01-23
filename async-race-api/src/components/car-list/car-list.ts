import './car-list.css';
import Car from '../car/car';
import CarListModel from '../model/car-list-model';
import CarItem from '../car-item/car-item';

export default class CarList {
  private car: Car;

  private carItems: CarItem[] = [];

  private carList: HTMLUListElement;

  private pageNumber: HTMLSpanElement;

  private title: HTMLHeadingElement;

  private buttonNext: HTMLButtonElement;

  private buttonPrev: HTMLButtonElement;

  private victoryMessage: HTMLDivElement;

  public constructor(private element: HTMLElement, private model: CarListModel) {
    this.car = new Car();
    this.onCarsUpdated = this.onCarsUpdated.bind(this);
    this.onButtonNext = this.onButtonNext.bind(this);
    this.onButtonPrev = this.onButtonPrev.bind(this);
    this.createVictoryMessage = this.createVictoryMessage.bind(this);

    this.initialize();
  }

  private initialize(): void {
    this.carList = document.createElement('ul');
    this.carList.className = 'car-list';

    const paginationButtons = this.createPaginationButtons();
    const garageInfo = this.createGarageInfo();

    this.victoryMessage = document.createElement('div');
    this.victoryMessage.className = 'victory-message-hide';

    this.element.append(garageInfo, this.carList, paginationButtons);

    this.model.addEventListener('cars-updated', this.onCarsUpdated);
    this.model.addEventListener('post-new-winner', this.createVictoryMessage);
  }

  // eslint-disable-next-line class-methods-use-this
  private createGarageInfo() {
    const garageInfo = document.createElement('div');
    garageInfo.className = 'garage-info';

    this.title = document.createElement('h2');
    this.title.textContent = `Garage (${this.model.numberOfCars})`;

    this.pageNumber = document.createElement('span');
    this.pageNumber.textContent = `Page №${this.model.numberPage}`;

    garageInfo.append(this.title, this.pageNumber);

    return garageInfo;
  }

  // eslint-disable-next-line class-methods-use-this
  private createVictoryMessage() {
    this.victoryMessage.classList.remove('victory-message-hide');
    this.victoryMessage.classList.add('victory-message-show');

    this.victoryMessage.textContent = `Winner: ${this.model.winner.name} with Time: ${this.model.winner.time.toFixed(2)}`;
    document.body.append(this.victoryMessage);

    setTimeout(() => {
      this.victoryMessage.classList.remove('victory-message-show');
      this.victoryMessage.classList.add('victory-message-hide');
    }, 4000);
  }

  // eslint-disable-next-line class-methods-use-this
  private createPaginationButtons() {
    const paginationButtons = document.createElement('div');
    paginationButtons.className = 'pagination-buttons';

    this.buttonPrev = document.createElement('button');
    this.buttonPrev.textContent = 'Prev';
    this.buttonPrev.addEventListener('click', this.onButtonPrev);

    this.buttonNext = document.createElement('button');
    this.buttonNext.textContent = 'Next';
    this.buttonNext.addEventListener('click', this.onButtonNext);

    paginationButtons.append(this.buttonPrev, this.buttonNext);
    return paginationButtons;
  }

  private onButtonNext() {
    if (!this.model.isLastPage) {
      this.model.numberPage += 1;
      this.pageNumber.textContent = `Page №${this.model.numberPage}`;
    }
  }

  private onButtonPrev() {
    if (!this.model.isFirstPage) {
      this.model.numberPage -= 1;
      this.pageNumber.textContent = `Page №${this.model.numberPage}`;
    }
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

  public destroy(): void {
    this.model.removeEventListener('cars-updated', this.onCarsUpdated);
    this.model.removeEventListener('post-new-winner', this.createVictoryMessage);
    this.destroyCarItems();
  }

  private destroyCarItems() {
    this.carItems.forEach((carItem) => carItem.destroy());
    this.carItems = [];
  }
}
