import Car from '../car/car';
import CarItemModel from '../model/car-item-model';

export default class CarItem {
  constructor(private element: HTMLElement, private model: CarItemModel, private car: Car) {
    this.initialize();
    this.onClick = this.onClick.bind(this);
    this.element.addEventListener('click', this.onClick);
  }

  // eslint-disable-next-line class-methods-use-this
  private initialize() {
    const carName = document.createElement('span');
    carName.textContent = this.model.name;

    const carImg = this.car.createCar(this.model.color);

    const flagImg = document.createElement('img');
    flagImg.className = 'flag-svg';
    flagImg.src = './assets/flag.svg';

    const race = document.createElement('div');
    race.className = 'race';
    race.append(carImg, flagImg);

    this.element.append(carName, race);
  }

  // eslint-disable-next-line class-methods-use-this
  public destroy() {
    this.element.removeEventListener('click', this.onClick);
  }

  private onClick() {
    this.model.select();
  }
}
