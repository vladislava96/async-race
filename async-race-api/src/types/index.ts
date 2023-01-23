export type Car = {
  name: string;
  color: string;
  id: number;
};

export type CarRace = {
  name: string;
  color: string;
  id: number;
  time: number;
};

export type Cars = Array<Car>;

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type Winners = Array<Winner>;

export type StartedEngine = {
  velocity: number;
  distance: number;
};

export type Success = {
  success: 'string';
};

export type CreateCar = {
  name: string;
  color: string;
};

export type CreateWinner = {
  wins: number;
  time: number;
};

export type Status = 'started' | 'stopped';
export type Sort = 'id' | 'wins' | 'time';
export type Order = 'ASC' | 'DESC';

export type DataTable = {
  number: number;
  car: string;
  name: string;
  wins: number;
  time: number;
};
