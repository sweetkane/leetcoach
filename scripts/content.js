const resizeIconHtml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 2" width="14" height="2" fill="currentColor" class="transition text-gray-3 dark:text-dark-gray-3 group-hover:text-white dark:group-hover:text-white"><circle r="1" transform="matrix(-1 0 0 1 1 1)"></circle><circle r="1" transform="matrix(-1 0 0 1 7 1)"></circle><circle r="1" transform="matrix(-1 0 0 1 13 1)"></circle></svg>`
const div_a_selector = "#qd-content > div.h-full.flex-col.ssg__qd-splitter-secondary-w";
const div_b_selector = "#qd-content > div.h-full.flex-col.ssg__qd-splitter-secondary-w > div.relative.flex.h-full.flex-col";

function pollDOM () {

    const div_a = document.querySelector(div_a_selector);
    const div_b = document.querySelector(div_b_selector);

    if (div_a !== null && div_b !== null) {
        console.log("got it");
        div_a.id = "div_a";
        div_b.id = "div_b";

        const div_a1 = document.createElement("div");
        div_a1.id = "div_a1";
        div_a1.style = "height: 70%;";

        div_a1.appendChild(div_b);
        div_a.appendChild(div_a1);

        const resizeBar = createResizeBar();
        const chatInterface = createChatInterface();

        div_a.append(resizeBar, chatInterface);
        jQuery.resizable("leetcoachResizeBar", "h");
    } else {
        setTimeout(pollDOM, 300); // try again in 300 milliseconds
        console.log("waiting for page load...")
    }
}


function createChatInterface() {

    const container = document.createElement("div");

    container.style = "height: 300px; width: 100%; overflow-y: hidden; position: relative;";
    // TEXTBOX
    const textbox = document.createElement("div");
    textbox.className = "monaco-editor-background";
    textbox.style = "display: block; overflow-y: scroll; height: calc(100% - 90px); padding: 15px; ";
    document.addEventListener("fullscreenchange", function(event) {
      if (document.fullscreenElement) {
        console.log('Fullscreen is currently active.');
        textbox.style.height = "calc(100% - 45px)";
      } else {
        console.log('Fullscreen is not currently active.');
        textbox.style.height = "calc(100% - 90px)";
      }
    });
    //// HEADER
    const centeredText = document.createElement("span");
    centeredText.className = "mr-2 text-lg font-medium text-label-1 dark:text-dark-label-1";
    centeredText.style = "display: block; text-align: center;";
    centeredText.innerHTML = "Leetcoach Chat";
    textbox.appendChild(centeredText);
    const hr = document.createElement("hr");
    hr.style = "margin-top: 10px;"
    textbox.appendChild(hr);
    ////
    textbox.addEventListener('DOMSubtreeModified', () => {
        textbox.scrollTop = textbox.scrollHeight;
    });
    // FORM
    const form = document.createElement("div");
    form.style = "position: absolute; width: 100%; ";
    //// INPUT
    const input = document.createElement("input");
    input.type = "textarea";
    input.className = "rounded py-1.5";
    input.style = "width: 80%; padding-left: 5px; margin-top: 10px; position: absolute; top: 0;"
    input.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            const userText = event.target.value;
            event.target.value = '';
            submitUserTextEvent(textbox, userText);
        }
    });
    //// SEND
    const send = document.createElement("button");
    send.className = "px-3 py-1.5 font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-fill-3 dark:bg-dark-fill-3 hover:bg-fill-2 dark:hover:bg-dark-fill-2 text-label-2 dark:text-dark-label-2 rounded-lg"
    send.style = "position: absolute; right: calc(20% - 85px); top: 0; margin: 10px;  "
    send.textContent = "Send";
    send.onclick = function(){
        const userText = input.value;
        input.value = '';

        submitUserTextEvent(textbox, userText);
    }
    ////
    form.append(input, send);
    //
    container.append(textbox, form);
    return container
}
async function submitUserTextEvent(textbox, userText) {
    formatText(textbox, userText, "User");

    const infoClosure = (text) => printInfo(textbox, text);

    const responseText = await sendChatAndGetResponse(userText, infoClosure);
    formatText(textbox, responseText, "Coach");
}


function createResizeBar() {
    const resizeBar = document.createElement("div");
    resizeBar.className = "transition hover:bg-blue-s dark:hover:bg-dark-blue-s";
    resizeBar.id = "leetcoachResizeBar";
    resizeBar.style = "cursor: row-resize; height: 8px; width: 100%; float: left; display: flex; justify-content: center; align-items: center;"

    const resizeIcon = createElementFromHTML(resizeIconHtml);
    resizeBar.append(resizeIcon);

    return resizeBar;
}
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}
jQuery.resizable = function (resizerID, vOrH) {
    jQuery('#' + resizerID).bind("mousedown", function (e) {
        var start = e.pageY;
        if (vOrH == 'v') start = e.pageX;
        jQuery('body').bind("mouseup", function () {
            jQuery('body').unbind("mousemove");
            jQuery('body').unbind("mouseup");

        });
        jQuery('body').bind("mousemove", function (e) {
            var end = e.pageY;
            if (vOrH == 'v') end = e.pageX;
            if (vOrH == 'h') {
                jQuery('#' + resizerID).prev().height(jQuery('#' + resizerID).prev().height() + (end - start));
                jQuery('#' + resizerID).next().height(jQuery('#' + resizerID).next().height() - (end - start));
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
    element.innerHTML += "<b>[" + id + "]:" + "</b> ";
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

pollDOM();
