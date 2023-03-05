const chat = new chatmessages();
async function sendChatAndGetResponse(userChat) {
    if (chat.isnull) chat.init();
    chat.update_solution_progress();
    chat.add_user_message(userChat);
    const responseText = await prompt_chat(chat.messages);
    if (responseText === null) {
        return "[ Error ] Please retry shortly";
    }
    chat.add_assistant_message(responseText);
    console.log(chat.messages);
    return responseText;


}

// Please do not try to exploit this lambda url. Thanks!
async function prompt_chat(messages) {
    const url = "https://unsj2incakms24tnc3xhp4hk4y0gwivv.lambda-url.us-east-2.on.aws/"
    const response = await fetch(url,
        {
            method: "POST",
            body: JSON.stringify(messages)
        }
    )
    if (response.ok) {
        const parsed = await response.json();
        console.log("response good:", parsed.response);
        return parsed.response;
    }
    else {
        console.log("response error:", response);
        return null;
    }
}
