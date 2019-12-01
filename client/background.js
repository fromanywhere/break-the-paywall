function start(tab) {
  chrome.tabs.executeScript(null, {
    file: "content.js"
  });
}

function setStatus(isSuccess) {
  chrome.browserAction.setBadgeText({
    text: isSuccess ? '✓' : '✕'
  }, () => {
    setTimeout(() => {
      chrome.browserAction.setBadgeText({
        text: ''
      })
    }, 2000);
  });
}

function createBody(obj) {
  let result = [];
  for (let key in obj) {
    result.push(key + "=" + encodeURIComponent(obj[key]));
  }
  return result.join('&');
}

// https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension/18455088#18455088
function copyTextToClipboard(text) {
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  copyFrom.blur();
  document.body.removeChild(copyFrom);
}

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action === "getSource") {
    const data = request.data;
    chrome.browserAction.setBadgeText({
      text: '...'
    }, () => {
      chrome.storage.sync.get({
        endpoint: null,
        token: null
      }, (options) => {
        if (!options.endpoint || !options.token || !data.host || !data.name || !data.html) {
        console.log(options, data);
          return setStatus(false);
        }

        try {
          window.fetch(options.endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: createBody({
              host: data.host,
              token: options.token,
              name: data.name,
              html: data.html
            })
          }).then((response) => {
            if (response.status === 200) {
              response.text().then(function (text) {
                copyTextToClipboard(text);
                setStatus(true);
              });
            } else {
              setStatus(false);
            }
          });
        } catch (e) {
          return setStatus(false);
        }
      });
    })
  }
});

chrome.browserAction.onClicked.addListener(start);