import './header.css';

export default class Header {
  public render() {
    const header = document.createElement('div');
    header.className = 'header';

    const toGarageBtn = document.createElement('button');
    toGarageBtn.className = 'to-garage-btn';
    toGarageBtn.textContent = 'To Garage';

    const toWinnersBtn = document.createElement('button');
    toWinnersBtn.className = 'to-winners-btn';
    toWinnersBtn.textContent = 'To Winners';

    header.append(toGarageBtn, toWinnersBtn);

    document.body.appendChild(header);
  }
}
