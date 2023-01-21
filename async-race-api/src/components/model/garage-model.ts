import API from '../api/api';
import ListModel from './car-list-model';
import CreationModel from './creation-model';

export default class GarageModel {
  public readonly list: ListModel;

  public readonly creation: CreationModel;

  public readonly update: CreationModel;

  public constructor(private api: API) {
    this.onCreationSubmitted = this.onCreationSubmitted.bind(this);
    this.onItemSelected = this.onItemSelected.bind(this);

    this.list = new ListModel(this.api);
    this.list.addEventListener('item-selected', this.onItemSelected);
    this.creation = new CreationModel(this.api);
    this.creation.addEventListener(CreationModel.SUBMITTED, this.onCreationSubmitted);
    this.update = new CreationModel(this.api);
    this.update.addEventListener(CreationModel.SUBMITTED, this.onCreationSubmitted);
  }

  private onCreationSubmitted(): void {
    this.list.loadCars();
  }

  private onItemSelected() {
    this.update.textValue = this.list.selectedCarItem.name;
    this.update.colorValue = this.list.selectedCarItem.color;
    this.update.idValue = this.list.selectedCarItem.id;
  }
}
