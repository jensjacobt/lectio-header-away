function updateBadge(showHeader) {
  badge_text = showHeader ? "FRA" : "";
  chrome.browserAction.setBadgeText({text: badge_text});
}

function setShowHeader(showHeader) {
  localStorage.setItem('showHeader', showHeader);
  updateBadge(showHeader);
}

chrome.browserAction.onClicked.addListener(function (tab){
  state = localStorage.getItem('showHeader') === 'true';
  setShowHeader(!state);
  chrome.tabs.update(tab.id, {url: tab.url});
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.name == "showHeader?") {
    sendResponse({value: localStorage.getItem('showHeader')});
  }
});

chrome.runtime.onInstalled.addListener(function () {
  setShowHeader(false);
});

updateBadge(localStorage.getItem('showHeader') === 'true');
