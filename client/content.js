chrome.runtime.sendMessage({
    action: "getSource",
    data: {
        html: document.documentElement.outerHTML,
        host: window.location.hostname,
        name: (window.location.pathname + window.location.search).replace(/[\/?]/g, '-').substring(1)
    }
});