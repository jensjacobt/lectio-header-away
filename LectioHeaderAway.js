'use strict';

function setHeaderVisible(isVisible) {
  let display = isVisible ? 'table-cell' : 'none';
  let infoHeaders = document.getElementsByClassName('s2infoHeader');
  for (let i = 0; i < infoHeaders.length; i++) {
    infoHeaders[i].style.display = display;
  }
}

function showHeaderBasedOnSetting() {
  chrome.runtime.sendMessage({name: "shouldShowHeader"}, function (response) {
      setHeaderVisible(response.showHeader);
  });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "badge_clicked") {
    showHeaderBasedOnSetting();
  }
  sendResponse({log: 'Badge clicked'});
});

chrome.runtime.sendMessage({name: "shouldShowHeader"}, function (response) {
  if (response.showHeader) {
    document.addEventListener('DOMContentLoaded', function (event) {
      setHeaderVisible(true);
    });
  }
});
