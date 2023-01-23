import API from '../components/api/api';
import Garage from '../components/garage/garage';
import Header from '../components/header/header';
import GarageModel from '../components/model/garage-model';
import WinnersModel from '../components/model/winners-model';
import Winners from '../components/winners/winners';

export default class App {
  api: API;

  headerElement: HTMLElement;

  garageElement: HTMLDivElement;

  winnerElement: HTMLDivElement;

  header: Header;

  garagePage: Garage;

  winnersPage: Winners;

  constructor() {
    this.api = new API();

    this.headerElement = document.createElement('header');
    this.garageElement = document.createElement('div');
    this.winnerElement = document.createElement('div');

    const garageModel = new GarageModel(this.api);
    const winnersModel = new WinnersModel(this.api);

    this.header = new Header(this.headerElement);
    this.garagePage = new Garage(this.garageElement, garageModel);
    this.winnersPage = new Winners(this.winnerElement, winnersModel);

    garageModel.addEventListener('post-new-winner', () => winnersModel.createTableData());
  }

  async start() {
    document.body.append(this.headerElement, this.garageElement, this.winnerElement);
  }
}
