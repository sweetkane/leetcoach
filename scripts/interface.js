const chat = new chatmessages();

async function sendChatAndGetResponse(userChat, infoClosure) {
    if (chat.isnull) {
        infoClosure("[Sending problem description]");
        chat.init();
    }
    chat.add_user_message(userChat);
    const solutionUpdated = chat.update_solution_progress();
    if (solutionUpdated) {
        infoClosure("[Sending current solution]");
    }
    const responseText = await prompt_chat(chat.messages);
    if (responseText === null) {
        return "[ Error ] Please retry shortly";
    }
    chat.add_assistant_message(responseText);
    console.log(chat.messages);
    return responseText;


}


async function prompt_chat(messages) {
    // Please do not exploit :^)
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
