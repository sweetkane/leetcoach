

function pollDOM () {

    const rightPanel = document.querySelector(rightPanelSelector);
    const codePanel = document.querySelector(codePanelSelector);
    const consoleButton = document.querySelector(consoleButtonSelector);
    const submitButton = document.querySelector(submitButtonSelector);
    const runButton = document.querySelector(runButtonSelector);

    if (
      rightPanel !== null &&
      codePanel !== null &&
      consoleButton != null &&
      submitButton != null &&
      runButton != null
      ) {
        // move code panel inside new div
        const codePanelContainer = document.createElement("div");
        codePanelContainer.style = "height: 100%;";
        codePanelContainer.appendChild(codePanel);
        rightPanel.appendChild(codePanelContainer);

        // add resize bar and chat
        const resizeBar = createResizeBar();
        const chatInterface = createChatInterface();
        rightPanel.append(resizeBar, chatInterface);
        jQuery.resizable(resizeBar.id, "h");

        // add show/hide button to bottom menu
        const showHideButton = createShowHideButton(
          codePanelContainer, chatInterface, resizeBar
        );
        consoleButton.insertAdjacentElement("afterend", showHideButton);

        submitButton.addEventListener(
          "click", () => {
            setTimeout(replaceButtonOnSubmit, 50, showHideButton)
          }
        );
        runButton.addEventListener(
          "click", () => {
            setTimeout(replaceButtonOnRun, 50, showHideButton)
          }
        );

    } else {
        setTimeout(pollDOM, 300); // try again in 300 milliseconds
        console.log("Leetcoach waiting for page load...");
    }
}

function replaceButtonOnSubmit(showHideButton) {
  console.log("replace button on submit");
  const consoleButton = document.querySelector(consoleButtonSelectorPostSubmit);
  if (consoleButton !== null) {
    console.log("hello");
    console.log(showHideButton);
    consoleButton.insertAdjacentElement("afterend", showHideButton);

  } else {
    console.log("goodbye");
    setTimeout(replaceButtonOnSubmit, 50, showHideButton); // try again in 300 milliseconds
  }
}

function replaceButtonOnRun(showHideButton) {
  console.log("replace button on run");
  const consoleButton = document.querySelector(consoleButtonSelectorPostRun);
  if (consoleButton !== null) {
    console.log("hello");
    console.log(showHideButton);
    consoleButton.insertAdjacentElement("afterend", showHideButton);

  } else {
    console.log("goodbye");
    setTimeout(replaceButtonOnRun, 50, showHideButton); // try again in 300 milliseconds
  }
}

// using resize bar disables the form repositioning
function createChatInterface() {
    const container = document.createElement("div");
    container.style = "height: 00%; width: 100%; overflow-y: hidden; position: relative;";
    const textbox = createTextbox();
    const form = createForm(textbox);
    container.append(textbox, form);
    return container
}

async function submitUserTextEvent(textbox, userText) {
    const titleText = textbox.querySelector('#titleText');
    if (titleText) {
      titleText.remove();
    }
    formatText(textbox, userText, "User");
    const infoClosure = (text) => printInfo(textbox, text);
    const responseText = await sendChatAndGetResponse(userText, infoClosure);
    formatText(textbox, responseText, "Coach");
}

function createResizeBar() {
    const resizeBar = document.createElement("div");
    resizeBar.className = "transition hover:bg-blue-s dark:hover:bg-dark-blue-s";
    resizeBar.id = "leetcoachResizeBar";
    resizeBar.style = "cursor: row-resize; height: 0px; width: 100%; float: left; display: flex; justify-content: center; align-items: center;"

    const resizeIcon = createElementFromHTML(resizeIconHtml);
    resizeBar.append(resizeIcon);

    return resizeBar;
}
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}
jQuery.resizable = function (resizerID, vOrH) {
  const codeContainer = jQuery('#' + resizerID).prev();
  const chatContainer = jQuery('#' + resizerID).next();
  jQuery('#' + resizerID).on("mousedown", function (e) {
      var start = e.pageY;
      if (vOrH == 'v') start = e.pageX;
      jQuery('body').on("mouseup", function () {
          jQuery('body').off("mousemove");
          jQuery('body').off("mouseup");
          const codeHeight = codeContainer.height() / codeContainer.parent().height() * 100;
          codeContainer.css('height', `${codeHeight}%`);
          codeHeightSetting = `${codeHeight}%`;

          const chatHeight = chatContainer.height() / chatContainer.parent().height() * 100;
          chatContainer.css('height', `${chatHeight}%`);
          chatHeightSetting = `${chatHeight}%`;

      });
      jQuery('body').on("mousemove", function (e) {
          var end = e.pageY;
          if (vOrH == 'v') end = e.pageX;
          if (vOrH == 'h') {

            codeContainer.height(codeContainer.height() + (end - start));
            chatContainer.height(chatContainer.height() - (end - start));

          } else {
              jQuery('#' + resizerID).prev().width(jQuery('#' + resizerID).prev().width() + (end - start));
              jQuery('#' + resizerID).next().width(jQuery('#' + resizerID).next().width() - (end - start));
          }
          start = end;
      });
  });
}

function printInfo(textbox, text) {
  const textDiv = document.createElement("div");
  textDiv.style = "margin-top: 5px;";
  textDiv.className = "text-xs text-gray-6 dark:text-dark-gray-6";
  textDiv.innerHTML += text;

  const hr = document.createElement("hr");
  hr.style = "margin-top: 5px;";

  textbox.append(textDiv,hr);
}

function formatText(element, text, id) {

    const space = document.createElement("div");
    space.style = "margin-top: 10px";
    element.appendChild(space);
    element.appendChild(createNametag(id));
    element.innerHTML += "<b> </b>";
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith("```")) {
        // Handle code block
        const code = document.createElement("code");
        const language = line.slice(3);
        if (language) {
          code.className = `language-${language}`;
        }
        let codeLines = [];
        for (let j = i + 1; j < lines.length; j++) {
          const codeLine = lines[j];
          if (codeLine.startsWith("```")) {
            i = j;
            break;
          } else {
            codeLines.push(codeLine);
          }
        }
        code.textContent = codeLines.join("\n");
        const pre = document.createElement("pre");
        pre.appendChild(code);
        element.appendChild(pre);
        continue;
      } else {
        // Handle normal text
        const textNode = document.createTextNode(line);

        element.appendChild(textNode);
      }
      if (i < lines.length - 1) {
        // Add line break
        element.appendChild(document.createElement("br"));
      }
    }
    // Add horizontal line
    const hr = document.createElement("hr");
    hr.style = "margin-top: 10px;"
    element.appendChild(hr);
    return element;
}

function createNametag(text) {
  const nametag = document.createElement("div");
  if (text == "User") {
    nametag.className = "bg-olive dark:bg-dark-olive text-olive dark:text-dark-olive inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize dark:bg-opacity-[.15]"
  }
  else {
    nametag.className = "bg-yellow dark:bg-dark-yellow text-yellow dark:text-dark-yellow inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize dark:bg-opacity-[.15]"
  }
  nametag.innerText = text;
  return nametag;
}


function createShowHideButton(codeDiv, chatDiv, resizeDiv) {
  const svg = createElementFromHTML(svgOpenHtml+pathHtml+svgCloseHtml);

  const innerDiv = document.createElement("div");
  innerDiv.className = "ml-1 transform transition";
  innerDiv.append(svg);

  const button = document.createElement("button");
  button.className = "px-3 py-1.5 font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-fill-3 dark:bg-dark-fill-3 hover:bg-fill-2 dark:hover:bg-dark-fill-2 text-label-2 dark:text-dark-label-2 rounded-lg pl-3 pr-2";
  button.innerText = "LeetCoach";
  button.append(innerDiv);

  button.onclick = function() {
    if (chatIsOpen) {
      // proceed to close chat
      innerDiv.className = "ml-1 transform transition";
      codeDiv.style.height = "100%";
      chatDiv.style.height = "0%";
      resizeDiv.style.height = "0px";
    }
    else {
      // proceed to open chat
      innerDiv.className = "ml-1 transform transition rotate-180";
      codeDiv.style.height = codeHeightSetting;
      chatDiv.style.height = chatHeightSetting;
      resizeDiv.style.height = "8px";
    }
    chatIsOpen = !chatIsOpen;
  }
  return button;
}

function createTitle() {
  const titleTextContainer = document.createElement("div");
  titleTextContainer.id = "titleText";
  titleTextContainer.style = "display: flex; flex-direction: column; height:100%; justify-content: center; align-items: center; opacity: 0.5;";
  const titleText = document.createElement("div");
  titleText.style = "text-align: center;"
  titleText.className = "mr-2 text-lg font-medium text-label-1 dark:text-dark-label-1";
  titleText.innerText = "LeetCoach Chat";
  const subtitleText = document.createElement("div");
  subtitleText.style = "text-align: center";
  subtitleText.className = "mr-2 text-sm font-medium text-label-1 dark:text-dark-label-1";
  subtitleText.innerText = "v0.0.1.0";
  titleTextContainer.append(titleText, subtitleText);
  return titleTextContainer;
}

function createSendButton(textbox) {
  const send = document.createElement("button");
  send.className = "px-3 py-1.5 font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-fill-3 dark:bg-dark-fill-3 hover:bg-fill-2 dark:hover:bg-dark-fill-2 text-label-2 dark:text-dark-label-2 rounded-lg"
  send.style = "position: absolute; right: 20px; top: 10px;"
  send.textContent = "Send";
  send.onclick = function(){
    const userText = input.value;
    input.value = '';
    submitUserTextEvent(textbox, userText);
  }
  return send;
}

function createTextInput(textbox) {
  const input = document.createElement("input");
  input.type = "textarea";
  input.className = "rounded py-1.5";
  input.placeholder = "Ask a question...";
  input.style = "width: calc(100% - 102px); padding-left: 10px; position: absolute; top: 10px; left: 10px;"
  input.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
          const userText = event.target.value;
          event.target.value = '';
          submitUserTextEvent(textbox, userText);
      }
  });
  return input;
}

function createForm(textbox) {
  const form = document.createElement("div");
  form.style = "position: absolute; width: 100%; ";
  const input = createTextInput(textbox);
  const send = createSendButton(textbox);
  form.append(input, send);
  return form;
}

function createTextbox() {
  const textbox = document.createElement("div");
  textbox.className = "monaco-editor-background";
  textbox.style = "display: block; overflow-y: scroll; height: calc(100% - 61px); padding: 15px; ";
  const titleTextContainer = createTitle();
  textbox.appendChild(titleTextContainer);
  textbox.addEventListener('DOMSubtreeModified', () => {
      textbox.scrollTop = textbox.scrollHeight;
  });
  return textbox;
}

pollDOM();
