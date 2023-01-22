import { garage } from '../../constants/constants';
import { Car, CarRace } from '../../types';
import API from '../api/api';

export default class CarItemModel extends EventTarget {
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

  public delete(): void {
    this.api.delete(garage, this.id)
      .then(() => {
        this.dispatchEvent(new CustomEvent('deleted'));
      });
  }

  public select(): void {
    this.dispatchEvent(new CustomEvent('selected'));
  }

  public async startEngine(): Promise<CarRace> {
    const data = await this.api.startOrStopEngine(this.id, 'started');
    const time = data.distance / (data.velocity * 1000);
    return {
      name: this.name,
      color: this.color,
      id: this.id,
      time,
    };
  }

  public async getDriveMode() {
    return this.api.switchEngineToDriveMode(this.id);
  }
}
