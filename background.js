'use strict';

function updateBadge(showHeader) {
  let badge_text = showHeader ? "FRA" : "";
  chrome.browserAction.setBadgeText({text: badge_text});
}

function setShowHeader(showHeader) {
  localStorage.setItem('showHeader', showHeader);
  updateBadge(showHeader);
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.name === "shouldShowHeader") {
    sendResponse({showHeader: localStorage.getItem('showHeader') === 'true'});
  }
});

chrome.browserAction.onClicked.addListener(function (tab) {
  let currentShowHeader = localStorage.getItem('showHeader') === 'true';
  setShowHeader(!currentShowHeader);
  chrome.tabs.query({}, function(tabs) {
    let regex = RegExp('https?://www.lectio.dk/lectio/[0-9]*/SkemaNy.aspx.*');
    for (let i = 0; i < tabs.length; i++) {
      if(regex.test(tabs[i].url)) {
        chrome.tabs.sendMessage(tabs[i].id, {action: "badge_clicked"}, function(response) {
          console.log(response.log);
        });
      }
    }
  });
});

chrome.runtime.onInstalled.addListener(function () {
  setShowHeader(false);
});

updateBadge(localStorage.getItem('showHeader') === 'true');
