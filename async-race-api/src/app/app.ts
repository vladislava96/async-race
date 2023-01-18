import API from '../components/api/api';
import Garage from '../components/garage/garage';
import Header from '../components/header/header';
import GarageModel from '../components/model/garage-model';
import Winners from '../components/winners/winners';

export default class App {
  api: API;

  header: Header;

  garageElement: HTMLElement;

  garagePage: Garage;

  winnersPage: Winners;

  constructor() {
    this.api = new API();
    this.header = new Header();
    this.garageElement = document.createElement('div');
    this.garagePage = new Garage(this.garageElement, new GarageModel(this.api));
    this.winnersPage = new Winners();
  }

  async start() {
    document.body.appendChild(this.garageElement);
    this.header.render();
    // this.garagePage.render();
  }
}
