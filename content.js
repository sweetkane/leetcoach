
const rightContainerSelector = "#qd-content > div.h-full.flex-col.ssg__qd-splitter-secondary-w"
const rightTopSelector = "#qd-content > div.h-full.flex-col.ssg__qd-splitter-secondary-w > div.relative.flex.h-full.flex-col"
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
    container.className = "flex w-full overflow-y-auto flex-col";
    //container.style = "height: 300px; width: 100%; overflow-y: scroll;"

    const textbox = document.createElement("div");
    // textbox.style = "height: 50%;";
    textbox.innerHTML  = "Chat with the coach!<br /><br />";

    var input = document.createElement("input");
    input.type = "textarea";
    input.className = "mt-auto px-5 pt-8 pb-2.5";
    input.style = "position: absolute; bottom: 0;";
    input.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            const userText = event.target.value;
            event.target.value = '';

            submitUserTextEvent(textbox, userText);
        }
    });


    container.append(textbox, input);
    return container
}
async function submitUserTextEvent(textbox, userText) {
    textbox.innerHTML += "User: " + userText + "<br /><br />";
    responseText = await sendChatAndGetResponse(userText);
    textbox.innerHTML += "Coach: " + responseText + "<br /><br />";
}


function createResizeBar() {
    const resizeBar = document.createElement("div");
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

pollDOM();
