import Car from '../car/car';
import WinnersModel from '../model/winners-model';
import './winners.css';

export default class Winners {
  private car: Car;

  private buttonPrev: HTMLButtonElement;

  private buttonNext: HTMLButtonElement;

  private pageNumber: HTMLSpanElement;

  private title: HTMLHeadingElement;

  private sortSelect: HTMLSelectElement;

  private bodyTableOfWinners: HTMLTableSectionElement;

  constructor(private element: HTMLDivElement, private model: WinnersModel) {
    this.createWinnersInfo = this.createWinnersInfo.bind(this);
    this.createSortSelect = this.createSortSelect.bind(this);
    this.createWinnersData = this.createWinnersData.bind(this);
    this.createPaginationButtons = this.createPaginationButtons.bind(this);
    this.onButtonNext = this.onButtonNext.bind(this);
    this.onButtonPrev = this.onButtonPrev.bind(this);
    this.sortWinners = this.sortWinners.bind(this);
    this.model.addEventListener('create-table-data', this.createWinnersData);
    this.car = new Car();

    this.initialize();
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
  }

  // eslint-disable-next-line class-methods-use-this
  private createWinnersInfo() {
    const winnersInfo = document.createElement('div');
    winnersInfo.className = 'winners-info';

    this.title = document.createElement('h2');
    this.title.textContent = `Winners (${this.model.numberOfWinners})`;

    this.pageNumber = document.createElement('span');
    this.pageNumber.textContent = `Page №${this.model.numberPage}`;

    winnersInfo.append(this.title, this.pageNumber);

    return winnersInfo;
  }

  // eslint-disable-next-line class-methods-use-this
  private createTableOfWinners() {
    const tableHeaders = ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)'];

    const tableOfWinners = document.createElement('table');
    tableOfWinners.className = 'table-of-winners';

    const rowTableOfWinners = document.createElement('tr');

    tableHeaders.forEach((header) => {
      const headerTableOfWinners = document.createElement('th');
      headerTableOfWinners.textContent = header;
      rowTableOfWinners.appendChild(headerTableOfWinners);
    });

    this.bodyTableOfWinners = document.createElement('tbody');
    tableOfWinners.append(rowTableOfWinners, this.bodyTableOfWinners);

    return tableOfWinners;
  }

  private createWinnersData() {
    this.bodyTableOfWinners.innerHTML = '';

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

      this.bodyTableOfWinners.append(row);
    });

    this.title.textContent = `Winners (${this.model.numberOfWinners})`;
    this.pageNumber.textContent = `Page №${this.model.numberPage}`;

    this.buttonNext.disabled = this.model.isLastPage;
    this.buttonPrev.disabled = this.model.isFirstPage;
  }

  // eslint-disable-next-line class-methods-use-this
  private createSortSelect() {
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

  private createPaginationButtons() {
    const paginationButtons = document.createElement('div');
    paginationButtons.className = 'pagination-buttons';

    this.buttonPrev = document.createElement('button');
    this.buttonPrev.textContent = 'Prev';
    this.buttonPrev.addEventListener('click', this.onButtonPrev);

    this.buttonNext = document.createElement('button');
    this.buttonNext.textContent = 'Next';
    this.buttonNext.addEventListener('click', this.onButtonNext);

    paginationButtons.append(this.buttonPrev, this.buttonNext);
    return paginationButtons;
  }

  private sortWinners() {
    this.model.sort = this.sortSelect.value;
  }

  private onButtonNext() {
    if (!this.model.isLastPage) {
      this.model.numberPage += 1;
      this.pageNumber.textContent = `Page №${this.model.numberPage}`;
    }
  }

  private onButtonPrev() {
    if (!this.model.isFirstPage) {
      this.model.numberPage -= 1;
      this.pageNumber.textContent = `Page №${this.model.numberPage}`;
    }
  }

  public destroy() {
    this.bodyTableOfWinners.innerHTML = '';
    this.element.innerHTML = '';
  }
}
