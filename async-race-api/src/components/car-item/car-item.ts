import Car from '../car/car';
import CarItemModel from '../model/car-item-model';
import Track from '../track/track';
import './car-item.css';

export default class CarItem {
  private track: Track;

  private startEngineButton: HTMLButtonElement;

  private stopEngineButton: HTMLButtonElement;

  private selectCarButton: HTMLButtonElement;

  constructor(private element: HTMLElement, private model: CarItemModel, private car: Car) {
    this.onClick = this.onClick.bind(this);
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

    this.selectCarButton = document.createElement('button');
    this.selectCarButton.textContent = 'select';
    this.selectCarButton.addEventListener('click', this.onClick);

    this.startEngineButton = document.createElement('button');
    this.startEngineButton.textContent = 'A';
    this.startEngineButton.addEventListener('click', this.startEngine);

    this.stopEngineButton = document.createElement('button');
    this.stopEngineButton.textContent = 'B';
    this.stopEngineButton.addEventListener('click', this.stopEngine);
    engineButtons.append(this.selectCarButton, this.startEngineButton, this.stopEngineButton);

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

  public destroy() {
    this.selectCarButton.removeEventListener('click', this.onClick);
    this.startEngineButton.removeEventListener('click', this.startEngine);
    this.stopEngineButton.removeEventListener('click', this.stopEngine);
  }

  private onClick() {
    this.model.select();
  }
}
