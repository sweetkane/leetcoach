const rightContainerSelector = "#qd-content > div.h-full.flex-col.ssg__qd-splitter-secondary-w"
const rightTopSelector = "#qd-content > div.h-full.flex-col.ssg__qd-splitter-secondary-w > div.relative.flex.h-full.flex-col"
const resizeIconHtml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 2" width="14" height="2" fill="currentColor" class="transition text-gray-3 dark:text-dark-gray-3 group-hover:text-white dark:group-hover:text-white"><circle r="1" transform="matrix(-1 0 0 1 1 1)"></circle><circle r="1" transform="matrix(-1 0 0 1 7 1)"></circle><circle r="1" transform="matrix(-1 0 0 1 13 1)"></circle></svg>`

function pollDOM () {

    const rightContainer = document.querySelector(rightContainerSelector);

    if (rightContainer !== null) {

        const rightTop = document.querySelector(rightTopSelector);
        rightTop.style += " height: 80%;";

        console.log("got it");
        const resizeBar = document.createElement("div");
        resizeBar.id = "leetcoachResizeBar";
        resizeBar.style = "cursor: row-resize; height: 8px; width: 100%; float: left; display: flex; justify-content: center; align-items: center;"

        const resizeIcon = createElementFromHTML(resizeIconHtml);
        resizeBar.append(resizeIcon);
        rightContainer.append(resizeBar);
        jQuery.resizable("leetcoachResizeBar", "h");

        const canvas = document.createElement("div");
        canvas.style = "height: 300px; width: 100%; overflow-y: scroll;"
        chatInterface(canvas);
        rightContainer.append(canvas);
    } else {
        setTimeout(pollDOM, 300); // try again in 300 milliseconds
        console.log("waiting for page load...")
    }
}


function chatInterface(container) {
    const textbox = document.createElement("div");
    textbox.innerHTML  = "Chat with the coach!<br /><br />";

    var input = document.createElement("input");
    input.type = "text";
    input.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            const userText = event.target.value;
            event.target.value = '';

            submitUserTextEvent(textbox, userText);
        }
    });
    container.append(textbox, input);
}

async function submitUserTextEvent(textbox, userText) {
    textbox.innerHTML += "User: " + userText + "<br /><br />";
    responseText = await sendChatAndGetResponse(userText);
    textbox.innerHTML += "Coach: " + responseText + "<br /><br />";
}

pollDOM();

// resize bar
// http://jsfiddle.net/hekai/2ecmub63/

// jquery
// https://stackoverflow.com/questions/21317476/how-to-use-jquery-in-chrome-extension


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


function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
  }
