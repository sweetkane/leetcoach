//////////// messages for "api/v1/chat/completions" //////////////
let chat = new chatmessages();
async function sendChatAndGetResponse(userChat) {
    if (chat.isnull) chat.init();
    chat.update_solution_progress();
    chat.add_user_message(userChat);
    const responseText = await prompt_chat(chat.messages);
    if (responseText === null) {
        console.log("ERROR: got no response from Lambda");
        return "[ Error ] Please retry shortly";
    }
    chat.add_assistant_message(responseText);
    console.log(chat.messages);
    return responseText;


}


// OPENAI API HANDLING
// TODO start transition to gpt-3.5-turbo model
// https://platform.openai.com/docs/guides/chat/introduction
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
        console.log("response:", parsed.response);
        return parsed.response;
    }
    else {
        return null;
    }
}
