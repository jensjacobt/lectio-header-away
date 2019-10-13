'use strict';

let port = chrome.runtime.connect({name: 'LectioHeaderAway'}); //  + '-' + Math.random()

port.onMessage.addListener(function(message) {
  if (message.action == 'updateHeader') {
    setHeaderVisible(message.showHeader);
  }
});

document.addEventListener('DOMContentLoaded', function(event) {
  port.postMessage({action: 'firstUpdate'});
});

function setHeaderVisible(isVisible) {
  let display = isVisible ? 'table-cell' : 'none';
  let infoHeaders = document.getElementsByClassName('s2infoHeader');
  for (let i = 0; i < infoHeaders.length; i++) {
    infoHeaders[i].style.display = display;
  }
}
