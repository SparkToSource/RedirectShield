import "./donate.css";

export class Donate {
  private readonly link: HTMLAnchorElement;

  constructor() {
    this.link = this.build();
  }

  get element() {
    return this.link;
  }

  private build() {
    const a = document.createElement("a");
    a.classList.add("donate-link");
    a.innerText = "Buy me a coffee ☕";
    a.href = this.getDonateUrl();
    a.target = "_blank";
    return a;
  }

  private getDonateUrl() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (timeZone.startsWith("America")) {
      return "https://donate.stripe.com/3cI7sLf5PeBP4cG5sub7y00";
    }

    return "https://donate.stripe.com/eVq14naPzgJX24y3kmb7y01";
  }
}
