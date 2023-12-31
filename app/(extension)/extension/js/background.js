// background.js

let menuExists = false;
// Create the context menu item if it doesn't exist
if (!menuExists) {
  chrome.contextMenus.create({
    id: "showPopup",
    title: "Kiểm tin cho \"%s\"",
    contexts: ["selection"]
  });
  menuExists = true; // Set the flag to true after creating the menu
}

// Handle context menu item click
chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId === "showPopup" && info.selectionText) {
    const modifiedSelectionText = info.selectionText.trim().replace(/\s+/g, '/');
    // Open a new window with the popup.html file
    chrome.windows.create({
      type: 'popup',
      // url: chrome.runtime.getURL('popup_window.html'),
      url: 'http://localhost:3000/extension-fc/' + modifiedSelectionText,
      width: 1200,
      height: 750,
      focused: true
    });
  }
});

// background.js

console.log("Background script initialized");

