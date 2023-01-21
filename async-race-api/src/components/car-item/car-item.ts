import Car from '../car/car';
import CarItemModel from '../model/car-item-model';
import Track from '../track/track';
import './car-item.css';

export default class CarItem {
  private track: Track;

  private startEngineButton: HTMLButtonElement;

  private stopEngineButton: HTMLButtonElement;

  private selectCarButton: HTMLButtonElement;

  private deleteCarButton: HTMLButtonElement;

  constructor(private element: HTMLElement, private model: CarItemModel, private car: Car) {
    this.selectCar = this.selectCar.bind(this);
    this.deleteCar = this.deleteCar.bind(this);
    this.startEngine = this.startEngine.bind(this);
    this.stopEngine = this.stopEngine.bind(this);

    this.initialize();
  }

  private initialize() {
    const carName = document.createElement('span');
    carName.textContent = this.model.name;

    const trackElement = document.createElement('div');
    this.track = new Track(trackElement, this.car, this.model.color);

    const engineButtons = document.createElement('div');

    this.deleteCarButton = document.createElement('button');
    this.deleteCarButton.textContent = 'delete';
    this.deleteCarButton.addEventListener('click', this.deleteCar);

    this.selectCarButton = document.createElement('button');
    this.selectCarButton.textContent = 'select';
    this.selectCarButton.addEventListener('click', this.selectCar);

    this.startEngineButton = document.createElement('button');
    this.startEngineButton.textContent = 'A';
    this.startEngineButton.addEventListener('click', this.startEngine);

    this.stopEngineButton = document.createElement('button');
    this.stopEngineButton.textContent = 'B';
    this.stopEngineButton.addEventListener('click', this.stopEngine);
    engineButtons.append(
      this.deleteCarButton,
      this.selectCarButton,
      this.startEngineButton,
      this.stopEngineButton,
    );

    this.element.append(carName, engineButtons, trackElement);
  }

  async startEngine() {
    const time = await this.model.startEngine();
    this.track.startMoving(time);
    try {
      await this.model.getDriveMode();
    } catch (error) {
      if (error instanceof Error) {
        global.console.error(error.message);
      }
      this.track.stopHere();
    }
  }

  stopEngine() {
    this.track.comeBackToStart();
  }

  private selectCar() {
    this.model.select();
  }

  private deleteCar() {
    this.model.delete();
  }

  public destroy() {
    this.selectCarButton.removeEventListener('click', this.selectCar);
    this.startEngineButton.removeEventListener('click', this.startEngine);
    this.stopEngineButton.removeEventListener('click', this.stopEngine);
  }
}
