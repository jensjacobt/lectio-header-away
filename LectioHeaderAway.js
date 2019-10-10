function headerBack() {
  var infoHeaders = document.getElementsByClassName('s2infoHeader');
  for (var i = 0; i < infoHeaders.length; i++) {
    infoHeaders[i].style.display = 'table-cell';
  }
}

chrome.runtime.sendMessage({name: "showHeader?"}, function (response) {
  if (response.value === 'true') {
  	headerBack();
  	document.body.addEventListener('DOMContentLoaded', function (event) {
        headerBack();
  	});
  }
});
