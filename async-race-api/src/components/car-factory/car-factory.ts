import { CreateCar } from '../../types';

const carBrands = [
  'Toyota',
  'Nissan',
  'Skoda',
  'Audi',
  'Tesla',
  'BMW',
  'Mersedes',
  'Ford',
  'Honda',
  'Lada',
];

const carModels = [
  'Model A',
  'Model Z',
  'Corolla',
  'Camry',
  'A8',
  'A4',
  'Polo',
  'Jetta',
  'Passat',
  'Supra',
];

export default class CarFactory {
  constructor(private brands: Array<string>, private models: string[]) {
  }

  public generateCar(): CreateCar {
    const carBrandIndex = Math.floor(Math.random() * this.brands.length);
    const carModelIndex = Math.floor(Math.random() * this.models.length);
    const carName = `${this.brands[carBrandIndex]} ${this.models[carModelIndex]}`;

    const randomColor = `#${(`${Math.random().toString(16)}000000`).substring(2, 8)}`;

    const car = {
      name: carName,
      color: randomColor,
    };
    return car;
  }

  public static create() {
    return new CarFactory(carBrands, carModels);
  }
}
