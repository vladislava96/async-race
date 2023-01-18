import CreationModel from '../model/creation-model';

export default class CreationForm {
  public constructor(private model: CreationModel) {
  }

  // eslint-disable-next-line class-methods-use-this
  submitForm(event: Event, textInput: HTMLInputElement, colorInput: HTMLInputElement) {
    event?.preventDefault();
    this.model.textValue = textInput.value;
    this.model.colorValue = colorInput.value;
    this.model.submit();
  }

  renderCreationBlock() {
    const carCreationForm = document.createElement('form');
    carCreationForm.className = 'car-creation-form';

    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.className = 'text-input';
    textInput.id = 'create-name';
    textInput.required = true;

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.className = 'color-input';
    colorInput.id = 'create-color';
    colorInput.required = true;

    const createButton = document.createElement('button');
    createButton.type = 'submit';
    createButton.textContent = 'Create';
    createButton.className = 'color-button';
    createButton.id = 'create-button';

    carCreationForm.append(textInput, colorInput, createButton);
    carCreationForm.addEventListener('submit', (event) => this.submitForm(event, textInput, colorInput));

    return carCreationForm;
  }
}
