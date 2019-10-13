'use strict';

let ports = [];

chrome.runtime.onConnect.addListener(function(port) {
  // console.log('Port connected:', port.name);
  ports.push(port);
  port.onDisconnect.addListener(function() {
    // console.log('Port disconnected:', port.name);
    ports.pop(port);
  });
  port.onMessage.addListener(function(message) {
    if(message.action == 'firstUpdate') {
      updateHeader([port]);
    }
  });
});

chrome.browserAction.onClicked.addListener(function (tab) {
  let currentShowHeader = getShowHeader();
  setShowHeader(!currentShowHeader);
  updateHeader(ports);
});

chrome.runtime.onInstalled.addListener(function () {
  setShowHeader(false);
});

updateBadge(getShowHeader());

function updateHeader(ports) {
  let showHeader = getShowHeader();
  ports.forEach(port => {
    port.postMessage({action: 'updateHeader', showHeader: showHeader});
  });
}

function updateBadge(showHeader) {
  let badge_text = showHeader ? 'FRA' : '';
  chrome.browserAction.setBadgeText({text: badge_text});
}

function getShowHeader() {
  return localStorage.getItem('showHeader') === 'true';
}

function setShowHeader(showHeader) {
  localStorage.setItem('showHeader', showHeader);
  updateBadge(showHeader);
}
