import { garage, winners } from '../../constants/constants';
import { Car, CarRace } from '../../types';
import API from '../api/api';

export default class CarItemModel extends EventTarget {
  private raceTimeValue: number = 0;

  private isStartEngineDisabledValue: boolean = false;

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

  public set isStartEngineDisabled(value: boolean) {
    this.isStartEngineDisabledValue = value;
    this.dispatchEvent(new CustomEvent('engine-start-disabled-change'));
  }

  public get isStartEngineDisabled(): boolean {
    return this.isStartEngineDisabledValue;
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
    this.api.startOrStopEngine(this.id, 'stopped')
      .then(() => {
        this.dispatchEvent(new CustomEvent('come-back-to-start'));
      });
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
