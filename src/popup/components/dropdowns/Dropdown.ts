import { Observable } from "../observable/Observable";
import "./dropdown.css";

export class Dropdown<T extends string = string> {
  readonly changeEvent = new Observable<T>();
  protected readonly label: HTMLLabelElement;
  protected readonly select: HTMLSelectElement;

  constructor(id: string, text: string, options?: T[]) {
    const { label, select } = this.buildLabel(id, text);
    this.label = label;
    this.select = select;

    if (options) {
      this.buildOptions(this.select, options);
    }
  }

  get element() {
    return this.label;
  }

  get value() {
    return this.select.value as T;
  }

  set value(value: T) {
    this.select.value = value;
  }

  setOptions(options: T[]) {
    const currentValue = this.value; // Updating the options will reset the select.value to the first option

    this.select.innerHTML = "";

    this.buildOptions(this.select, options);

    if (this.value === currentValue || options.length === 0) {
      return;
    }

    if (options.find(option => option === currentValue)) {
      this.value = currentValue;
    } else {
      this.select.dispatchEvent(new Event("change"));
    }
  }

  protected onChange() {
    return Promise.resolve();
  }

  private buildLabel(id: string, text: string) {
    const label = document.createElement("label");
    label.classList.add("dropdown");

    const select = document.createElement("select");
    select.id = id;
    select.addEventListener("change", async () => {
      await this.onChange();
      this.changeEvent.notify(this.value);
    });

    const textNode = document.createTextNode(text);

    label.append(
      textNode,
      select,
    );

    return { label, select };
  }

  private buildOptions(select: HTMLSelectElement, options: T[]) {
    for (let option of options) {
      const optionElement = document.createElement("option");
      optionElement.innerText = option;
      select.appendChild(optionElement);
    }
  }
}
