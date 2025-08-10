import { HomePage } from "./pages/HomePage";
import "./popup.css";

class Popup {
  start() {
    const homepage = new HomePage();
    document.body.append(homepage.element);
  }
}

const popup = new Popup();
popup.start();
