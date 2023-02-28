// https://developer.chrome.com/docs/extensions/reference/runtime/#example-content-msg

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'get-cookies') {
        chrome.cookies.getAll(
            {"domain": "leetcode.com"},
            (cookies) => {
                console.log(cookies)
                sendResponse(user);
            }
        );
    }
  });
