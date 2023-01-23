import './car.css';

export default class Car {
  // eslint-disable-next-line class-methods-use-this
  public createCar(color: string) {
    const newCar = document.createElement('div');
    newCar.className = 'new-car';
    newCar.innerHTML = `<svg width="93" height="33" viewBox="0 0 93 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.1946 0C18.4588 0 17.7825 0.403992 17.4336 
    1.05182L12.6154 10H9.38325C7.46824 10 5.72147 11.0938 4.8852 12.8165L1.48716 19.8165C-0.12487 
    23.1373 2.29383 27 5.98518 27H11.3736C12.4412 30.4743 15.6756 33 19.5 33C23.3244 33 26.5588 30.4743 
    27.6264 27H62.3736C63.4412 30.4743 66.6756 33 70.5 33C74.3244 33 77.5588 30.4743 78.6264 27H87.1329C91.404 
    27 93.7088 21.9908 90.9301 18.7471L84.9336 11.7471C83.9837 10.6382 82.5965 10 81.1364 10H74.5565C74.4219 9.76947 
    74.2333 9.55737 73.9858 9.37866L61.5243 0.378662C61.1834 0.132507 60.7737 0 60.3533 0H19.1946ZM64.1553 10C66.1107 
    10 66.9041 7.48291 65.3022 6.36151L61.0165 3.36151C60.6803 3.12622 60.2799 3 59.8696 3H45C43.8954 3 43 3.89545 43 
    5V8C43 9.10455 43.8954 10 45 10H64.1553ZM38 10C39.1046 10 40 9.10455 40 8V5C40 3.89545 39.1046 3 38 
    3H20.9333C20.1947 3 19.5162 3.4071 19.1686 4.05884L17.5686 7.05884C16.8581 8.39105 17.8235 10 19.3333 10H38Z" 
    fill="${color}"/>
    </svg>`;

    return newCar;
  }
}
