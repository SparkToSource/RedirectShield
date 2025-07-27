import { NetRequestBlocker } from "./NetRequestBlocker";

class Background {
  start() {
    const d = new NetRequestBlocker();
    d.attempt2();
  }
}

const background = new Background();
background.start();
