# <img src="src/popup/images/logo.svg" alt="RedirectShield Logo" style="height:2em; vertical-align:middle;"> Redirect Shield

Redirect Shield is a browser extension designed to protect users from malicious or unwanted redirects. It intercepts and blocks redirects that lead the user away from the current site, giving users more control over their browsing experience.

---

## 📦 Features

- 🔒 Block site redirects before they happen.

- 📋 Easily specify which sites should be blocked.

- 🗑️ Optionally remove the element that triggered a redirect.

- 🛑 Failsafe lets users deny any redirect attempt manually.

- ⚙️ Fully customizable to match your browsing style and security needs.

---

## ⚙️ Settings

#### 🌐 Block Mode
- **All**: Activate the extension on all websites.  
- **List**: Activate only on sites specified in the "Blocked Sites" list.  
- **None**: Disable the extension entirely.

#### 🗑️ Removal Policy

- **None**: Never remove any elements, regardless of redirect behavior.  
- **Safe**: Remove only elements that are definitively identified as the source of a redirect.  
- **Aggressive**: Automatically remove the last clicked element whenever a redirect is blocked, regardless of whether it was the actual trigger.

#### 🔄 Same-Site Navigation
Enable or disable redirects within the same website. A redirect is considered "same-site" if the destination hostname matches the current hostname.


#### 🛑 "Unsaved Changes" Failsafe 
Some redirects can't be intercepted directly. When enabled, this feature prompts users with a **"Leave site?"** warning whenever the site attempts to navigate away. Users can manually cancel the redirect to remain on the page.

#### 📋 Blocked Sites List
Enter one site per line to specify which domains should have redirect blocking enabled.

---

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SparkToSource/RedirectShield.git
2. Build the project:
   ```bash
   npm run start
3. Go to your browser's extension management page (e.g., `chrome://extensions` or `edge://extensions/`).
4. Enable Developer Mode (if not enabled already).
5. Select `Load Unpacked` and upload the `dist` folder.

---

## 🧪 Test Instructions

1. Install the extension following the steps outlined in the **Installation** section.  
2. Add `sparktosource.github.io` to your **Blocked Sites** list.  
3. Visit the test page at:  
   [`https://sparktosource.github.io/RedirectShield/test.html`](https://sparktosource.github.io/RedirectShield/test.html)

> ⚠️ **Important**: Make sure `sparktosource.github.io` is added to the blocked sites list *before* navigating to the test page.  
> If you add it afterward, you’ll need to refresh the page for the redirect blocking to take effect.
