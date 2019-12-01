module.exports = {
    port: 80,
    path: "",
    alias: "",
    rules: {
        "republic.ru": [
            {
                type: "replace",
                find: '"//',
                replace: '"http://'
            },
            {
                type: "replace",
                find: '"/',
                replace: '"https://republic.ru/'
            }, {
                type: "remove-by-selector",
                selectors: [
                    "script",
                    "noscript",
                    ".modal-wrapper",
                    ".advert",
                    ".post-footer",
                    ".comments-wrapper",
                    ".panel"
                ]
            }
        ]
    },
    token: []
};