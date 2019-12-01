const form = document.querySelector('form');
const endpoint = form.elements['endpoint'];
const token = form.elements['token'];

function updateValues() {
    chrome.storage.sync.get({
        endpoint: null,
        token: null
    }, function(items) {
        endpoint.value = items.endpoint || '';
        token.value = items.token || '';
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    chrome.storage.sync.set({
        endpoint: endpoint.value,
        token: token.value
    });

    window.close();
});

updateValues();