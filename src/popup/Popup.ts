import { HomePage } from "./pages/homepage/HomePage";
import "./popup.css";

class Popup {
  start() {
    const homepage = new HomePage();
    document.body.append(homepage.element);
  }
}

const popup = new Popup();
popup.start();
