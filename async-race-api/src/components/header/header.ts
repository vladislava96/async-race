import './header.css';

export default class Header {
  constructor(private element: HTMLElement) {
    this.onToGarageBtnClick = this.onToGarageBtnClick.bind(this);
    this.onToWinnersBtnClick = this.onToWinnersBtnClick.bind(this);

    this.initialize();
  }

  public initialize() {
    const header = document.createElement('div');
    header.className = 'header';

    const toGarageBtn = document.createElement('button');
    toGarageBtn.className = 'to-garage-btn';
    toGarageBtn.textContent = 'To Garage';
    toGarageBtn.addEventListener('click', this.onToGarageBtnClick);

    const toWinnersBtn = document.createElement('button');
    toWinnersBtn.className = 'to-winners-btn';
    toWinnersBtn.textContent = 'To Winners';
    toWinnersBtn.addEventListener('click', this.onToWinnersBtnClick);

    header.append(toGarageBtn, toWinnersBtn);

    this.element.appendChild(header);
  }

  // eslint-disable-next-line class-methods-use-this
  private onToGarageBtnClick() {
    const garagePage = document.querySelector('.garage-page');
    garagePage?.classList.remove('garage-page-hide');
    const winnersPage = document.querySelector('.winners-page');
    winnersPage?.classList.add('winners-page-hide');
  }

  // eslint-disable-next-line class-methods-use-this
  private onToWinnersBtnClick() {
    const garagePage = document.querySelector('.garage-page');
    garagePage?.classList.add('garage-page-hide');
    const winnersPage = document.querySelector('.winners-page');
    winnersPage?.classList.remove('winners-page-hide');
  }
}
