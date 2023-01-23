import { garage, winners } from '../../constants/constants';
import { Car, CarRace } from '../../types';
import API from '../api/api';

export default class CarItemModel extends EventTarget {
  private raceTimeValue: number = 0;

  public constructor(private api: API, private car: Car) {
    super();
  }

  public get id(): number {
    return this.car.id;
  }

  public get name(): string {
    return this.car.name;
  }

  public get color(): string {
    return this.car.color;
  }

  public get raceTime(): number {
    return this.raceTimeValue;
  }

  public delete(): void {
    this.api.delete(garage, this.id)
      .then(() => this.api.delete(winners, this.id))
      .then(() => {
        this.dispatchEvent(new CustomEvent('deleted'));
      });
  }

  public select(): void {
    this.dispatchEvent(new CustomEvent('selected'));
  }

  private async startEngine(): Promise<CarRace> {
    const data = await this.api.startOrStopEngine(this.id, 'started');
    const time = data.distance / (data.velocity * 1000);
    return {
      name: this.name,
      color: this.color,
      id: this.id,
      time,
    };
  }

  public comeBackToStart(): void {
    this.dispatchEvent(new CustomEvent('come-back-to-start'));
    // this.track.comeBackToStart();
  }

  public startRace(): Promise<CarRace> {
    return new Promise((resolve, reject) => {
      this.startEngine().then((carRace) => {
        this.raceTimeValue = carRace.time;

        const timerId = setTimeout(() => resolve(carRace), carRace.time * 1000);

        this.dispatchEvent(new CustomEvent('engine-started'));

        this.getDriveMode()
          .then(() => carRace)
          .catch((error) => {
            if (error instanceof Error) {
              global.console.error(error.message);
            }

            this.dispatchEvent(new CustomEvent('engine-stopped'));

            clearTimeout(timerId);
            reject(error);
          });
      });
    });
  }

  public async getDriveMode() {
    return this.api.switchEngineToDriveMode(this.id);
  }
}
