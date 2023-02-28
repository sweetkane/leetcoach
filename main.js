document.getElementById("myButton").addEventListener("click", myFunction);

async function myFunction() {

  const button = document.getElementsByTagName("button")[0];

  const currentTab = await getCurrentTab();
  const currentTabUrl = currentTab.url;
  const parsedUrl = parseLeetcodeUrl(currentTabUrl);
  if (parsedUrl === "invalid url") {
    const message = document.createTextNode("Active tab is not a leetcode problem");
    const parent = button.parentNode;
    parent.replaceChild(message, button);
    return;
  }

  cookies = await getCookies();



  const message = document.createTextNode(currentTabUrl);
  const parent = button.parentNode;
  parent.replaceChild(message, button);
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function parseLeetcodeUrl(urlRaw) {
  const prefix = "https://leetcode.com/problems/";
  if (urlRaw.substr(0,30) !== prefix) {
    return "invalid url";
  }
  const problemName = urlRaw.split('/')[4];
  return prefix + problemName;


}

async function getRelevantText(problemBaseUrl) {
  descriptionUrl = problemBaseUrl + "/description/"
  editorialUrl = problemBaseUrl + "/editorial/"


}

// currently we are trying to get cookies for usage in making http requests
// to leetcode. chrome has the cookies but will only give us to them if we
// request it from a background service. For some reason, sending a message
// to the background service is causing undefined and confusing behavior.
// TODO: fix it
async function getCookies() {
  // 1. Send a message to the service worker requesting the user's data

  chrome.runtime.sendMessage('get-cookies', (response) => {
    // 3. Got an asynchronous response with the data from the service worker
    console.log('received cookies', response);

  });
}
