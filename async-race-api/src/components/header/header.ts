import './header.css';

export default class Header extends EventTarget {
  public render() {
    const header = document.createElement('div');
    header.className = 'header';

    const toGarageBtn = document.createElement('button');
    toGarageBtn.className = 'to-garage-btn';
    toGarageBtn.textContent = 'To Garage';
    toGarageBtn.addEventListener('click', () => {
      const garagePage = document.querySelector('.garage-page');
      garagePage?.classList.remove('garage-page-hide');
      const winnersPage = document.querySelector('.winners-page');
      winnersPage?.classList.add('winners-page-hide');
    });

    const toWinnersBtn = document.createElement('button');
    toWinnersBtn.className = 'to-winners-btn';
    toWinnersBtn.textContent = 'To Winners';
    toWinnersBtn.addEventListener('click', () => {
      const garagePage = document.querySelector('.garage-page');
      garagePage?.classList.add('garage-page-hide');
      const winnersPage = document.querySelector('.winners-page');
      winnersPage?.classList.remove('winners-page-hide');
      this.dispatchEvent(new CustomEvent('click-winners'));
    });

    header.append(toGarageBtn, toWinnersBtn);

    document.body.appendChild(header);
  }
}
