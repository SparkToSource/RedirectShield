class ContentScript {
  inject() {
    const script = document.createElement("script");
    script.textContent = `(alert("HOI");)();`; // TODO: Inject compiled Content script code
    document.documentElement.prepend(script);
    script.remove();
  }
}

const redirectShield = new ContentScript();
redirectShield.inject();
