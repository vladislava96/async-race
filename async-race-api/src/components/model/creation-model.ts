import { garage } from '../../constants/constants';
import API from '../api/api';

export default class CreationModel extends EventTarget {
  public static SUBMITTED = 'submitted';

  private text: string;

  private color: string;

  public constructor(private api: API) {
    super();

    this.text = '';
    this.color = '';
  }

  public set textValue(textValue: string) {
    this.text = textValue;
  }

  public get textValue(): string {
    return this.text;
  }

  public set colorValue(colorValue: string) {
    this.color = colorValue;
  }

  public get colorValue(): string {
    return this.color;
  }

  public submit(): void {
    const creationData = {
      name: this.text,
      color: this.color,
    };

    this.api.post(garage, creationData).then(() => {
      this.dispatchEvent(new CustomEvent('submitted'));
    });
  }
}
