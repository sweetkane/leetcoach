
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
    //container.className = "flex w-full overflow-y-auto flex-col";
    //container.style = "padding: 10px; overflow-y: scroll;";
    container.style = "height: 300px; width: 100%; overflow-y: hidden; position: relative;"
    // container.style = "padding-bottom: 10px;";
    const textbox = document.createElement("div");
    textbox.className = "vs-dark";
    textbox.style = "overflow-y: scroll; height: calc(100% - 75px); ";
    textbox.innerHTML  = "Chat with the coach!<br /><br />";

    const input = document.createElement("input");
    input.type = "textarea";
    //input.className = "mt-auto px-5 pt-8 pb-2.5";
    input.style = "position: absolute; bottom: 50px; width: 90%; margin: 0px;";
    input.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            const userText = event.target.value;
            event.target.value = '';

            submitUserTextEvent(textbox, userText);
        }
    });

    // const input = createElementFromHTML(inputHtml);


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

const inputHtml = `
<div style="position: relative; bottom: 5px; width: calc(100% - 25px);" >
   <div>
      <div class="relative">
         <div class="flex w-full flex-col rounded-[13px] bg-layer-2 dark:bg-dark-layer-2 shadow-level1 dark:shadow-dark-level1">
            <textarea data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" placeholder="Type question here..." class="w-full resize-none bg-transparent p-4 text-md outline-0 outline-none dark:bg-transparent min-h-[80px] placeholder:text-label-4 dark:placeholder:text-dark-label-4 inherit" rows="1" style="overflow: hidden; overflow-wrap: break-word; height: 80px;"></textarea>
            <div class="relative box-content flex h-8 items-end p-4" style="width: 100%;">

                <div class="flex items-center gap-4" style="position: absolute; right: 50px;" >
                    <button class="font-medium items-center whitespace-nowrap focus:outline-none inline-flex transition-colors cursor-pointer py-[5px] px-3 rounded-lg bg-green-s dark:bg-dark-green-s hover:bg-green-3 dark:hover:bg-dark-green-3 text-white dark:text-dark-white opacty-100" disabled="">Send</button>
                </div>
            </div>
         </div>
         <div class="absolute box-content rounded-lg z-base-1 hidden"></div>
      </div>
   </div>
</div>
`

pollDOM();
