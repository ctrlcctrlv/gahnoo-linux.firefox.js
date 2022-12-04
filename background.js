"use strict";

/*
This is the page for which we want to rewrite the User-Agent header.
*/
let targetPage = "<all_urls>";

const regex = /(?!(GNU\/))Linux/g;
const linux = "Linux";
const gnu_linux = `GNU/${linux}`;

/*
Rewrite the User-Agent header.
*/
function rewriteUserAgentHeaderAsync(e) {
  const asyncRewrite = new Promise((resolve, reject) => {
    for (const header of e.requestHeaders) {
      if (header.name.toLowerCase() === "user-agent") {
        header.value = header.value.replace(regex, gnu_linux);
      }
    }
    resolve({ requestHeaders: e.requestHeaders });
  });

  return asyncRewrite;
}

/*
Make it "blocking" so we can modify the headers.
*/
browser
  .webRequest
  .onBeforeSendHeaders.addListener(rewriteUserAgentHeaderAsync,
                                   {urls: [targetPage]},
                                   ["blocking", "requestHeaders"]);
