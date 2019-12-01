const fs = require('fs');
const http = require('http');
const qs = require('querystring');
const JSDOM = require('jsdom').JSDOM;

const config = require('./config');

function checkToken(token) {
    return config.token.includes(token);
}

function applyRules(host, html) {
    const rules = config.rules[host];
    if (!rules) {
        return html;
    }

    let htmlCopy = html;
    rules.forEach((rule) => {
        switch (rule.type) {
            case "replace":
                const regExp = new RegExp(rule.find, 'ig');
                htmlCopy = htmlCopy.replace(regExp, rule.replace);
                break;
            case "remove-by-selector":
                const root = new JSDOM(htmlCopy);
                rule.selectors.forEach((selector) => {
                    const collection = [...root.window.document.querySelectorAll(selector)];
                        collection.forEach((node) => {
                        node.remove();
                    })
                });
                htmlCopy = root.serialize();
                break;
        }
    });
    return htmlCopy;
}

function getUrl(host, name) {
    const path = config.path + "/" + host;
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    const replacedName = name.endsWith('.html')
        ? name
        : name + '.html';

    return host + "/" + replacedName;
}

function getAlias(url) {
    return config.alias + url;
}

function saveContent(html, url) {
    fs.writeFileSync(config.path + "/" + url, html, 'utf8');
}

function createResponse(response, statusCode, data) {
    response.writeHead(statusCode, {'Content-Type': 'text/html'});
    if (data) {
        response.write(data);
    }
    response.end();
}

http.createServer(function (request, response) {
    if(request.method === 'POST') {
        let requestBody = '';
        request.on('data', function(data) {
            requestBody += data;
            if(requestBody.length > 1e7) {
                createResponse(response,413);
            }
        });
        request.on('end', function() {
            const formData = qs.parse(requestBody);
            if (checkToken(formData.token)) {
                const result = applyRules(formData.host, formData.html);
                const url = getUrl(formData.host, formData.name);
                try {
                    saveContent(result, url);
                    createResponse(response,200, getAlias(url));
                } catch (e) {
                    console.log(e);
                    createResponse(response,500);
                }
            } else {
                createResponse(response,401);
            }
        });
    } else {
        createResponse(response,405);
    }
}).listen(config.port);