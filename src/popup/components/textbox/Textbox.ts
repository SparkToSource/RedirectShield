import { Observable } from "../observable/Observable";
import "./textbox.css";

export class Textbox {
  readonly changeEvent = new Observable<string>();
  protected readonly label: HTMLElement;
  protected readonly input: HTMLTextAreaElement;
  private oldValue: string;

  constructor(text: string, placeholder: string) {
    const label = document.createElement("label");
    label.classList.add("textbox");

    const input = document.createElement("textarea");
    input.placeholder = placeholder;

    input.addEventListener("focus", () => this.oldValue = this.value);

    input.addEventListener("blur", async () => {
      if (this.value !== this.oldValue) {
        this.changeEvent.notify(this.value);
      }
    });

    this.input = input;

    const textNode = document.createTextNode(text);

    label.append(
      textNode,
      input,
    );

    this.label = label;
    this.oldValue = this.value;
  }

  get element() {
    return this.label;
  }

  get value() {
    return this.input.value;
  }

  set value(text: string) {
    this.input.value = text;
  }
}
