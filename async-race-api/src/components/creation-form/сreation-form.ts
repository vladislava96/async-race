import CreationModel from '../model/creation-model';
import './creation-form.css';

export default class CreationForm {
  private textInput: HTMLInputElement;

  private colorInput: HTMLInputElement;

  private carCreationForm: HTMLFormElement;

  public constructor(private model: CreationModel, private submitButtonCaption: string) {
    this.onModelTextChanged = this.onModelTextChanged.bind(this);
    this.onModelColorChanged = this.onModelColorChanged.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.model.addEventListener('text-changed', this.onModelTextChanged);
    this.model.addEventListener('color-changed', this.onModelColorChanged);
  }

  private submitForm(event: Event) {
    event?.preventDefault();
    this.model.textValue = this.textInput.value;
    this.model.colorValue = this.colorInput.value;
    this.model.submit();
  }

  private onModelTextChanged() {
    this.textInput.value = this.model.textValue;
  }

  private onModelColorChanged() {
    this.colorInput.value = this.model.colorValue;
  }

  public renderCreationBlock() {
    this.carCreationForm = document.createElement('form');
    this.carCreationForm.className = 'car-creation-form';

    this.textInput = document.createElement('input');
    this.textInput.type = 'text';
    this.textInput.className = 'text-input';
    this.textInput.id = 'create-name';
    this.textInput.required = true;

    this.colorInput = document.createElement('input');
    this.colorInput.type = 'color';
    this.colorInput.className = 'color-input';
    this.colorInput.id = 'create-color';
    this.colorInput.required = true;

    const createButton = document.createElement('button');
    createButton.type = 'submit';
    createButton.textContent = this.submitButtonCaption;
    createButton.className = 'color-button';
    createButton.id = 'create-button';

    this.carCreationForm.append(this.textInput, this.colorInput, createButton);
    this.carCreationForm.addEventListener('submit', this.submitForm);

    return this.carCreationForm;
  }

  public destroy() {
    this.model.removeEventListener('text-changed', this.onModelTextChanged);
    this.model.removeEventListener('color-changed', this.onModelColorChanged);
    this.carCreationForm.removeEventListener('submit', this.submitForm);
  }
}
