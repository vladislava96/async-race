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

  public constructor(private element: HTMLDivElement, private model: GarageModel) {
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
    this.carList = new CarList(carListElement, this.model.list);

    this.element.append(this.createControls(), carListElement);
  }

  public createControls(): HTMLDivElement {
    const carCreationBlock = this.creationForm.renderCreationBlock();
    const carUpdateBlock = this.updateForm.renderCreationBlock();

    const controls = document.createElement('div');
    controls.className = 'controls';

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

    const controlsButtons = document.createElement('div');

    controlsButtons.append(this.raceButton, this.resetButton, this.generateButton);
    controls.append(carCreationBlock, carUpdateBlock, controlsButtons);

    return controls;
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
