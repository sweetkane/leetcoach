document.getElementById("myButton").addEventListener("click", myFunction);

function myFunction() {
    // get the button element
    const button = document.getElementsByTagName("button")[0];

    // create a new text node with the message
    const message = document.createTextNode("Button clicked!");

    // get the parent element of the button
    const parent = button.parentNode;

    // replace the button with the message
    parent.replaceChild(message, button);
  }
