// https://developer.chrome.com/docs/extensions/reference/runtime/#example-content-msg

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message === 'get-cookies') {
//         chrome.cookies.getAll(
//             {"domain": "leetcode.com"},
//             (cookies) => {
//                 console.log(cookies)
//                 sendResponse(user);
//             }
//         );
//     }
//   });

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.type === "cookies") {

            const cookies = []
            sendResponse({cookies: cookies});
        }
        return true


    }
  );
