import { engine, garage } from '../../constants/constants';
import {
  ICars,
  ICreateCar,
  ICreateWinner,
  Status,
} from '../../types';

export default class API {
  // eslint-disable-next-line class-methods-use-this
  public async getAllCars(): Promise<ICars> {
    const response = await fetch(garage);
    const data = await response.json();
    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  async getAll(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  async getOne(url: string, id: number) {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  async post(url: string, creationData: ICreateCar | ICreateWinner) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creationData),
    });
    return response;
  }

  // eslint-disable-next-line class-methods-use-this
  async delete(url: string, id: number) {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    return response;
  }

  // eslint-disable-next-line class-methods-use-this
  async update(url: string, id: number, updateData: ICreateCar | ICreateWinner) {
    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    return response;
  }

  // eslint-disable-next-line class-methods-use-this
  async startOrStopEngine(id: number, status: Status) {
    const response = await fetch(`${engine}?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    const data = await response.json();
    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  async switchEngineToDriveMode(id: number) {
    const response = await fetch(`${engine}?id=${id}&status=drive`, {
      method: 'PATCH',
    });
    const data = await response.json();
    return data;
  }
}
