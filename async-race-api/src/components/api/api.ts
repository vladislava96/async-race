import { engine, garage, winners } from '../../constants/constants';
import {
  Cars,
  CreateCar,
  CreateWinner,
  Order,
  Sort,
  StartedEngine,
  Status,
  Success,
  Winners,
} from '../../types';

export default class API {
  // eslint-disable-next-line class-methods-use-this
  public async getCarsOnPage(page: number): Promise<Cars> {
    const response = await fetch(`${garage}?_page=${page}&_limit=7`);
    const data = await response.json();
    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  public async getWinnersPage(page: number, sort: Sort, order: Order): Promise<Winners> {
    const response = await fetch(`${winners}?_page=${page}&_limit=10&_sort=${sort}&_order=${order}`);
    const data = await response.json();
    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  public async getCars(): Promise<Cars> {
    const response = await fetch(`${garage}`);
    const data = await response.json();
    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  public async getWinners(): Promise<Winners> {
    const response = await fetch(`${winners}`);
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
    if (!response.ok) {
      throw new Error('Unexpected error.');
    }
    const data = await response.json();
    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  async post(url: string, creationData: CreateCar | CreateWinner) {
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
  async update(url: string, id: number, updateData: CreateCar | CreateWinner) {
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
  async startOrStopEngine(id: number, status: Status): Promise<StartedEngine> {
    const response = await fetch(`${engine}?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    const data = await response.json();
    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  async switchEngineToDriveMode(id: number): Promise<Success> {
    const response = await fetch(`${engine}?id=${id}&status=drive`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      if (response.status === 500) {
        throw Error('Car has been stopped suddenly. It\'s engine was broken down.');
      }
      if (response.status === 429) {
        throw Error('Drive already in progress. You can\'t run drive for the same car twice while it\'s not stopped.');
      }
      throw Error('Unexpected error.');
    }
    const data = await response.json();
    return data;
  }
}
