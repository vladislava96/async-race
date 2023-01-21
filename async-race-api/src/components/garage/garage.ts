import CreationForm from '../creation-form/сreation-form';
import './garage.css';
import CarList from '../car-list/car-list';
import GarageModel from '../model/garage-model';

export default class Garage {
  private creationForm: CreationForm;

  private updateForm: CreationForm;

  private carList: CarList;

  public constructor(private element: HTMLElement, private model: GarageModel) {
    this.initialize();
  }

  public initialize() {
    this.element.className = 'garage-page';

    const carListElement = document.createElement('div');
    this.carList = new CarList(carListElement, this.model.list);
    this.element.appendChild(carListElement);
    this.creationForm = new CreationForm(this.model.creation, 'Create');
    this.updateForm = new CreationForm(this.model.update, 'Update');

    const controller = this.createController();
    this.element.append(controller);
    // this.carList.createCarList();
  }

  // eslint-disable-next-line class-methods-use-this
  public renderUpdateBlock() {
    const carUpdateBlock = document.createElement('div');
    carUpdateBlock.className = 'car-update-block';

    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.className = 'text-input';
    textInput.id = 'update-name';

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.className = 'color-input';
    colorInput.id = 'update-color';

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.className = 'color-button';
    updateButton.id = 'update-button';

    carUpdateBlock.append(textInput, colorInput, updateButton);

    return carUpdateBlock;
  }

  public createController(): HTMLDivElement {
    const carCreationBlock = this.creationForm.renderCreationBlock();
    const carUpdateBlock = this.updateForm.renderCreationBlock();

    const controller = document.createElement('div');
    controller.className = 'controller';

    const raceButton = document.createElement('button');
    raceButton.textContent = 'race';
    const resetButton = document.createElement('button');
    resetButton.textContent = 'reset';
    const generateButton = document.createElement('button');
    generateButton.textContent = 'generate cars';
    const controllerButtons = document.createElement('div');

    controllerButtons.append(raceButton, resetButton, generateButton);
    controller.append(carCreationBlock, carUpdateBlock, controllerButtons);

    return controller;
  }

  // renderRace(): HTMLDivElement {
  //   const race = document.createElement('div');
  //   race.className = 'race';

  //   const road = this.carList.createCarList();

  //   race.append(road);

  //   return race;
  // }

  // eslint-disable-next-line class-methods-use-this
  // renderGarageInfo() {
  //   const garageInfo = document.createElement('div');

  //   const title = document.createElement('h2');
  //   title.textContent = 'Garage (4)';

  //   const pageNamber = document.createElement('span');
  //   pageNamber.textContent = 'Page №1';

  //   garageInfo.append(title, pageNamber);

  //   return garageInfo;
  // }

  // eslint-disable-next-line class-methods-use-this
  // createPaginationButtons() {
  //   const paginationButtons = document.createElement('div');
  //   const buttonPrev = document.createElement('button');
  //   buttonPrev.textContent = 'Prev';

  //   const buttonNext = document.createElement('button');
  //   buttonNext.textContent = 'Next';

  //   paginationButtons.append(buttonPrev, buttonNext);
  //   return paginationButtons;
  // }
}
