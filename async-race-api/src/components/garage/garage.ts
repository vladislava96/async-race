import CreationForm from '../creation-form/сreation-form';
import './garage.css';
import CarList from '../car-list/car-list';
import GarageModel from '../model/garage-model';

export default class Garage {
  private creationForm: CreationForm;

  private updateForm: CreationForm;

  private carList: CarList;

  private raceButton: HTMLButtonElement;

  private resetButton: HTMLButtonElement;

  private generateButton: HTMLButtonElement;

  public constructor(private element: HTMLElement, private model: GarageModel) {
    this.onRaceButtonClick = this.onRaceButtonClick.bind(this);
    this.onResetButtonClick = this.onResetButtonClick.bind(this);
    this.onGenerateButtonClick = this.onGenerateButtonClick.bind(this);
    this.onRaceEnd = this.onRaceEnd.bind(this);
    this.model.addEventListener('race-end', this.onRaceEnd);
    this.initialize();
  }

  public initialize() {
    this.element.className = 'garage-page';

    const carListElement = document.createElement('div');
    this.creationForm = new CreationForm(this.model.creation, 'Create');
    this.updateForm = new CreationForm(this.model.update, 'Update');
    const controller = this.createControls();
    this.element.append(controller);

    this.carList = new CarList(carListElement, this.model.list);
    this.element.appendChild(carListElement);
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

  public createControls(): HTMLDivElement {
    const carCreationBlock = this.creationForm.renderCreationBlock();
    const carUpdateBlock = this.updateForm.renderCreationBlock();

    const controller = document.createElement('div');
    controller.className = 'controls';

    this.raceButton = document.createElement('button');
    this.raceButton.textContent = 'race';
    this.raceButton.addEventListener('click', this.onRaceButtonClick);

    this.resetButton = document.createElement('button');
    this.resetButton.textContent = 'reset';
    this.resetButton.disabled = true;
    this.resetButton.addEventListener('click', this.onResetButtonClick);

    this.generateButton = document.createElement('button');
    this.generateButton.textContent = 'generate cars';
    this.generateButton.addEventListener('click', this.onGenerateButtonClick);

    const controllerButtons = document.createElement('div');

    controllerButtons.append(this.raceButton, this.resetButton, this.generateButton);
    controller.append(carCreationBlock, carUpdateBlock, controllerButtons);

    return controller;
  }

  private onRaceEnd() {
    this.resetButton.disabled = false;
    this.resetButton.disabled = false;
  }

  private onRaceButtonClick() {
    this.raceButton.disabled = true;
    this.model.startCars();
  }

  private onResetButtonClick() {
    this.raceButton.disabled = false;
    this.resetButton.disabled = true;
    this.model.resetCars();
  }

  private onGenerateButtonClick() {
    this.model.generateCars();
  }

  public destroy() {
    this.carList.destroy();
    this.creationForm.destroy();
    this.updateForm.destroy();
    this.raceButton.removeEventListener('click', this.onRaceButtonClick);
    this.resetButton.removeEventListener('click', this.onResetButtonClick);
  }
}
