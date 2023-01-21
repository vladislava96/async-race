import { garage } from '../../constants/constants';
import API from '../api/api';

export default class CreationModel extends EventTarget {
  public static SUBMITTED = 'submitted';

  private text: string;

  private color: string;

  private id: number | null;

  public constructor(private api: API) {
    super();

    this.text = '';
    this.color = '';
    this.id = null;
  }

  public set idValue(idValue: number) {
    this.id = idValue;
  }

  public set textValue(textValue: string) {
    this.text = textValue;
    this.dispatchEvent(new CustomEvent('text-changed'));
  }

  public get textValue(): string {
    return this.text;
  }

  public set colorValue(colorValue: string) {
    this.color = colorValue;
    this.dispatchEvent(new CustomEvent('color-changed'));
  }

  public get colorValue(): string {
    return this.color;
  }

  public submit(): void {
    const creationData = {
      name: this.text,
      color: this.color,
    };

    let promise;

    if (this.id === null) {
      promise = this.api.post(garage, creationData);
    } else {
      promise = this.api.update(garage, this.id, creationData);
    }
    promise.then(() => {
      this.dispatchEvent(new CustomEvent('submitted'));
    });
  }
}
