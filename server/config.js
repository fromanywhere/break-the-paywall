module.exports = {
    port: 80,
    path: "/absolute/path/on/your/filesystem",
    alias: "http://your-base-url/alias-path/",
    token: [
        "<approved>",
        "<token>",
        "<list>"
    ],
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
        ],
        "medium.com": [
            {
                type: "replace",
                find: 'noscript',
                replace: 'div'
            },
            {
                type: "remove-by-selector",
                selectors: [
                    "iframe",
                    "script",
                    "noscript",
                    "[aria-modal='true']",
                    "img[src*='?q=20']",
                    "link[as='script']",
                    ".branch-journeys-top"
                ]
            }
        ]
    }
};