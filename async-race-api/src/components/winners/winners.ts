import Car from '../car/car';
import WinnersModel from '../model/winners-model';
import './winners.css';

export default class Winners {
  private tableOfWinnersBody: HTMLTableSectionElement;

  private car: Car;

  constructor(private element: HTMLDivElement, private model: WinnersModel) {
    this.createTableBody = this.createTableBody.bind(this);
    this.model.addEventListener('create-table-data', this.createTableBody);
    this.car = new Car();
  }

  initialize() {
    this.element.className = 'winners-page';
    this.element.classList.add('winners-page-hide');
    this.element.textContent = 'WINNERS';

    this.element.appendChild(this.createTableOfWinners());
    document.body.appendChild(this.element);
  }

  // eslint-disable-next-line class-methods-use-this
  createTableOfWinners() {
    const tableHeaders = ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)'];

    const tableOfWinners = document.createElement('table');
    tableOfWinners.className = 'table-of-winners';

    const tableOfWinnersRow = document.createElement('tr');

    tableHeaders.forEach((header) => {
      const tableOfWinnersHeader = document.createElement('th');
      tableOfWinnersHeader.textContent = header;
      tableOfWinnersRow.appendChild(tableOfWinnersHeader);
    });
    this.tableOfWinnersBody = document.createElement('tbody');
    tableOfWinners.append(tableOfWinnersRow, this.tableOfWinnersBody);
    // const tableOfWinnersData = document.createElement('td');

    return tableOfWinners;
  }

  createTableBody() {
    this.tableOfWinnersBody.innerHTML = '';
    this.model.tableData.forEach((data) => {
      const row = document.createElement('tr');

      const number = document.createElement('td');
      number.textContent = data.number.toString();

      const car = document.createElement('td');
      car.appendChild(this.car.createCar(data.car));

      const name = document.createElement('td');
      name.textContent = data.name;

      const wins = document.createElement('td');
      wins.textContent = data.wins.toString();

      const time = document.createElement('td');
      time.textContent = data.time.toFixed(2).toString();

      row.append(number, car, name, wins, time);

      this.tableOfWinnersBody.append(row);
    });
  }

  destroy() {
    this.tableOfWinnersBody.innerHTML = '';
    this.element.innerHTML = '';
  }
}
