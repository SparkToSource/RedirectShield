import { Observable } from "../observable/Observable";
import "./switch.css";

export class Switch {
  readonly changeEvent = new Observable<boolean>();
  protected readonly label: HTMLLabelElement;
  protected readonly checkbox: HTMLInputElement;

  constructor(text: string, id?: string) {
    const label = document.createElement("label");
    label.classList.add("switch");

    const input = document.createElement("input");
    input.type = "checkbox";
    if (id) {
      input.id = id;
    }

    input.addEventListener("change", async () => {
      this.changeEvent.notify(this.checked);
    });

    const span = document.createElement("span");
    span.classList.add("slider");

    const textNode = document.createTextNode(text);

    label.append(
      input,
      textNode,
      span,
    );

    this.label = label;
    this.checkbox = input;
  }

  get element() {
    return this.label;
  }

  get checked() {
    return this.checkbox.checked;
  }

  set checked(value: boolean) {
    this.checkbox.checked = value;
  }
}
