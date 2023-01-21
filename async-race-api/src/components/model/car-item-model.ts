import { Car } from '../../types';
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

  public select(): void {
    this.dispatchEvent(new CustomEvent('selected'));
  }

  public async startEngine(): Promise<number> {
    const data = await this.api.startOrStopEngine(this.id, 'started');
    return data.distance / (data.velocity * 1000);
  }

  public async getDriveMode() {
    return this.api.switchEngineToDriveMode(this.id);
  }
}
