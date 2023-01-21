import Car from '../car/car';
import './track.css';

export default class Track {
  private carImg: HTMLDivElement;

  constructor(private element: HTMLElement, private car: Car, private color: string) {
    this.initialize();
  }

  initialize() {
    this.carImg = this.car.createCar(this.color);

    const flagImg = document.createElement('img');
    flagImg.className = 'flag-svg';
    flagImg.src = './assets/flag.svg';

    this.element.className = 'track';
    this.element.append(this.carImg, flagImg);
  }

  startMoving(time: number) {
    this.carImg.classList.add('new-car-animated');
    this.carImg.style.animationDuration = `${time}s`;
  }

  stopHere() {
    this.carImg.classList.add('new-car-animated-stop');
  }

  comeBackToStart() {
    this.carImg.classList.remove('new-car-animated', 'new-car-animated-stop');
  }
}
