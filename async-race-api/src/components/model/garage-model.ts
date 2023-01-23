import API from '../api/api';
import ListModel from './car-list-model';
import CreationModel from './creation-model';

export default class GarageModel extends EventTarget {
  public readonly list: ListModel;

  public readonly creation: CreationModel;

  public readonly update: CreationModel;

  public constructor(private api: API) {
    super();
    this.onCreationSubmitted = this.onCreationSubmitted.bind(this);
    this.onItemSelected = this.onItemSelected.bind(this);
    this.onPostNewWinner = this.onPostNewWinner.bind(this);
    this.onRaceEnd = this.onRaceEnd.bind(this);

    this.list = new ListModel(this.api);
    this.list.addEventListener('item-selected', this.onItemSelected);
    this.list.addEventListener('post-new-winner', this.onPostNewWinner);
    this.creation = new CreationModel(this.api);
    this.creation.addEventListener(CreationModel.SUBMITTED, this.onCreationSubmitted);
    this.update = new CreationModel(this.api);
    this.update.addEventListener(CreationModel.SUBMITTED, this.onCreationSubmitted);
    this.list.addEventListener('car-deleted', this.onPostNewWinner);
    this.list.addEventListener('race-end', this.onRaceEnd);
  }

  public startCars(): void {
    this.list.startCars();
  }

  public resetCars(): void {
    this.list.stopCars();
  }

  public generateCars() {
    this.list.generateCars();
  }

  private onCreationSubmitted(): void {
    this.list.loadCars();
  }

  private onPostNewWinner(): void {
    this.dispatchEvent(new CustomEvent('post-new-winner'));
  }

  public onRaceEnd(): void {
    this.dispatchEvent(new CustomEvent('race-end'));
  }

  private onItemSelected() {
    this.update.textValue = this.list.selectedCarItem.name;
    this.update.colorValue = this.list.selectedCarItem.color;
    this.update.idValue = this.list.selectedCarItem.id;
  }
}
