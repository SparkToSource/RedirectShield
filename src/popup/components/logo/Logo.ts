import "./logo.css";

export class Logo {
  private readonly image: HTMLDivElement;

  constructor() {
    this.image = this.build();
  }

  get element() {
    return this.image;
  }

  private build() {
    const image = document.createElement("div");
    image.classList.add("logo");

    return image;
  }
}