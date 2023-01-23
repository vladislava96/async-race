import Car from '../car/car';
import WinnersModel from '../model/winners-model';
import './winners.css';

export default class Winners {
  private tableOfWinnersBody: HTMLTableSectionElement;

  private car: Car;

  private buttonPrev: HTMLButtonElement;

  private buttonNext: HTMLButtonElement;

  private pageNumber: HTMLSpanElement;

  private title: HTMLHeadingElement;

  private sortSelect: HTMLSelectElement;

  constructor(private element: HTMLDivElement, private model: WinnersModel) {
    this.createTableBody = this.createTableBody.bind(this);
    this.createWinnersInfo = this.createWinnersInfo.bind(this);
    this.createPaginationButtons = this.createPaginationButtons.bind(this);
    this.createSortSelect = this.createSortSelect.bind(this);
    this.onButtonNext = this.onButtonNext.bind(this);
    this.onButtonPrev = this.onButtonPrev.bind(this);
    this.sortWinners = this.sortWinners.bind(this);
    this.model.addEventListener('create-table-data', this.createTableBody);
    this.car = new Car();
  }

  initialize() {
    this.element.className = 'winners-page';
    this.element.classList.add('winners-page-hide');

    this.element.append(
      this.createSortSelect(),
      this.createWinnersInfo(),
      this.createTableOfWinners(),
      this.createPaginationButtons(),
    );
    document.body.appendChild(this.element);
  }

  // eslint-disable-next-line class-methods-use-this
  createWinnersInfo() {
    const winnersInfo = document.createElement('div');

    this.title = document.createElement('h2');
    this.title.textContent = `Winners (${this.model.numberOfWinners})`;

    this.pageNumber = document.createElement('span');
    this.pageNumber.textContent = `Page №${this.model.numberPage}`;

    winnersInfo.append(this.title, this.pageNumber);

    return winnersInfo;
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

    this.title.textContent = `Winners (${this.model.numberOfWinners})`;
    this.pageNumber.textContent = `Page №${this.model.numberPage}`;

    this.buttonNext.disabled = this.model.isLastPage;
    this.buttonPrev.disabled = this.model.isFirstPage;
  }

  // eslint-disable-next-line class-methods-use-this
  createSortSelect() {
    this.sortSelect = document.createElement('select');
    this.sortSelect.className = 'sort-wins';
    this.sortSelect.addEventListener('change', this.sortWinners);
    const selectOptions = ['sort:', 'id ASC', 'id DESC', 'wins ASC', 'wins DESC', 'time ASC', 'time DESC'];
    selectOptions.forEach((selectOption) => {
      const option = document.createElement('option');
      option.textContent = selectOption;
      this.sortSelect.appendChild(option);
    });
    return this.sortSelect;
  }

  sortWinners() {
    this.model.sort = this.sortSelect.value;
  }

  createPaginationButtons() {
    const paginationButtons = document.createElement('div');

    this.buttonPrev = document.createElement('button');
    this.buttonPrev.textContent = 'Prev';
    this.buttonPrev.addEventListener('click', this.onButtonPrev);

    this.buttonNext = document.createElement('button');
    this.buttonNext.textContent = 'Next';
    this.buttonNext.addEventListener('click', this.onButtonNext);

    paginationButtons.append(this.buttonPrev, this.buttonNext);
    return paginationButtons;
  }

  onButtonNext() {
    if (!this.model.isLastPage) {
      this.model.numberPage += 1;
      this.pageNumber.textContent = `Page №${this.model.numberPage}`;
    }
  }

  onButtonPrev() {
    if (!this.model.isFirstPage) {
      this.model.numberPage -= 1;
      this.pageNumber.textContent = `Page №${this.model.numberPage}`;
    }
  }

  destroy() {
    this.tableOfWinnersBody.innerHTML = '';
    this.element.innerHTML = '';
  }
}
