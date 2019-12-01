# break-the-paywall
Share non-free html using your own storage.

## The idea and limitations
Just save the copy of current tab to your own cloud service and share the static link with one-click action.
This package is developed for text-based resources and blogs, so it manipulates with html source only.
All external resources like media or even css/js will be kept as is, so you may face with a sort of CORS restrictions.
 
## Implementation
This package contains client-side module as Chrome extension and server-side as simple node.js app, so nodejs environment is preferred.
Sharing process is quite simple — the extension make the copy of page and send it with provided token to identify the uploader.
The request is done sending POST urlencoded form without any encryption.
Server checks received token, optionally parse and apply transformations to the html according specific rules and save it to file system.
If all the process is done well, server responds back with share link.

##Setup
**Server**

Your need to have configured hosting resource to serve static html files with Apache/Nginx/whatever.
Then it is necessary to provide server configuration using config.js according the example.

`<port>`
Please specify available http port to handle incoming request. POST-only.

`<path>`
This is an absolute path to any folder on your filesystem to save html copies.

`<alias>`   
The base url-path which is used to generate share link.

`<token>`
List of approved tokens to specify upload possibility to restrict unauthorized upload and provide/revoke such possibility to other users.

`<rules> [optional]`
List of by-domain rules to clean and transform redundant content like external stats scripts, ads and so on.

**Client**

Unpack the extension code and install it into your Chrome.
Please specify extension settings to configure data transfer.
The extension require `endpoint url` and `token` from config.js `<token>` list.

##Workflow
Just click the extension icon — if the system is configured correctly, share link will be copied to your clipboard. 