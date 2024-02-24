'use strict';

let ports = [];

chrome.runtime.onConnect.addListener(function(port) {
  ports.push(port);
  port.onDisconnect.addListener(function() {
    ports.splice(ports.indexOf(port), 1);
  });
  port.onMessage.addListener(async function(message) {
    if(message.action == 'firstUpdate') {
      updateHeader([port], await getShowHeader());
    }
  });
});

chrome.storage.local.get(['showHeader'], ({ showHeader }) => {
  updateBadge(showHeader);
});

chrome.action.onClicked.addListener(async function () {
  const showHeader = await getShowHeader();
  const newShowHeader = !showHeader;
  setShowHeader(newShowHeader);
  updateHeader(ports, newShowHeader);
});

chrome.runtime.onInstalled.addListener(function () {
  setShowHeader(false);
});

function updateHeader(ports, showHeader) {
  ports.forEach(port => {
    port.postMessage({action: 'updateHeader', showHeader: showHeader});
  });
}

function updateBadge(showHeader) {
  let badge_text = showHeader ? 'FRA' : '';
  chrome.action.setBadgeText({text: badge_text});
}

async function getShowHeader() {
  const { showHeader } = await chrome.storage.local.get(['showHeader']);
  return showHeader;
}

async function setShowHeader(showHeader) {
  chrome.storage.local.set({ 'showHeader': showHeader });
  updateBadge(showHeader);
}
