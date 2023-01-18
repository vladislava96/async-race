import API from '../api/api';
import ListModel from './car-list-model';
import CreationModel from './creation-model';

export default class GarageModel {
  public readonly list: ListModel;

  public readonly creation: CreationModel;

  public constructor(private api: API) {
    this.onCreationSubmitted = this.onCreationSubmitted.bind(this);

    this.list = new ListModel(this.api);
    this.creation = new CreationModel(this.api);
    this.creation.addEventListener(CreationModel.SUBMITTED, this.onCreationSubmitted);
  }

  private onCreationSubmitted(): void {
    this.list.loadCars();
  }
}
