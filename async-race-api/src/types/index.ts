export interface ICar {
  name: string;
  color: string;
  id: number
}

export type ICars = Array<ICar>;

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export type IWinners = Array<IWinner>;

export type ICreateCar = {
  name: string;
  color: string
};

export type ICreateWinner = {
  id: number;
  wins: number;
  time: number
};

export type Status = 'started' | 'stopped';
export type Sort = 'id' | 'wins' | 'time';
export type Order = 'ASC' | 'DESC';
