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
    this.onStartEngineButtonClick = this.onStartEngineButtonClick.bind(this);
    this.stopEngine = this.stopEngine.bind(this);
    this.onEngineStarted = this.onEngineStarted.bind(this);
    this.onEngineStopped = this.onEngineStopped.bind(this);
    this.onComeBackToStart = this.onComeBackToStart.bind(this);

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
    this.startEngineButton.addEventListener('click', this.onStartEngineButtonClick);

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

    this.model.addEventListener('engine-started', this.onEngineStarted);
    this.model.addEventListener('engine-stopped', this.onEngineStopped);
    this.model.addEventListener('come-back-to-start', this.onComeBackToStart);
  }

  private onStartEngineButtonClick(): void {
    this.model.startRace();
  }

  private stopEngine(): void {
    this.model.comeBackToStart();
  }

  private selectCar(): void {
    this.model.select();
  }

  private deleteCar(): void {
    this.model.delete();
  }

  private onComeBackToStart(): void {
    this.track.comeBackToStart();
  }

  private onEngineStarted(): void {
    this.track.startMoving(this.model.raceTime);
  }

  private onEngineStopped(): void {
    this.track.stopHere();
  }

  public destroy(): void {
    this.selectCarButton.removeEventListener('click', this.selectCar);
    this.startEngineButton.removeEventListener('click', this.onStartEngineButtonClick);
    this.stopEngineButton.removeEventListener('click', this.stopEngine);
    this.model.removeEventListener('engine-started', this.onEngineStarted);
    this.model.removeEventListener('engine-stopped', this.onEngineStopped);
    this.model.removeEventListener('come-back-to-start', this.onComeBackToStart);
  }
}
