import API from '../components/api/api';
import Garage from '../components/garage/garage';
import Header from '../components/header/header';
import GarageModel from '../components/model/garage-model';
import WinnersModel from '../components/model/winners-model';
import Winners from '../components/winners/winners';

export default class App {
  api: API;

  header: Header;

  garageElement: HTMLElement;

  garagePage: Garage;

  winnersPage: Winners;

  winnerElement: HTMLDivElement;

  constructor() {
    this.api = new API();
    this.header = new Header();
    this.garageElement = document.createElement('div');
    this.winnerElement = document.createElement('div');
    const garageModel = new GarageModel(this.api);
    const winnersModel = new WinnersModel(this.api);
    this.garagePage = new Garage(this.garageElement, garageModel);
    this.winnersPage = new Winners(this.winnerElement, winnersModel);
    garageModel.addEventListener('post-new-winner', () => winnersModel.createTableData());
    this.header.addEventListener('click-winners', () => this.garagePage.toWinnersPage());
  }

  async start() {
    this.header.render();
    document.body.appendChild(this.garageElement);
    this.winnersPage.initialize();
  }
}
