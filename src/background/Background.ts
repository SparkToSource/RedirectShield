import browser from 'webextension-polyfill';
import { NetRequestBlocker } from "./NetRequestBlocker";

class Background {
  start() {
    browser.runtime.onMessage.addListener((message: any, sender: browser.Runtime.MessageSender) => {
      console.log("Message");
      console.log(message);
      console.log("Sender");
      console.log(sender);
      console.log(sender.tab);
      console.log(sender.tab?.id)
      if (message.origin !== undefined && sender.tab?.id !== undefined) {
        const requestBlocker = new NetRequestBlocker(message.origin, sender.tab.id);
        requestBlocker.block();
      }
    });
  }
}

const background = new Background();
background.start();
