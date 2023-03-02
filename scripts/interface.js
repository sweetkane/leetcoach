async function sendChatAndGetResponse(userChat) {
    update_prompt(userChat, "student");
    const prompt = get_prompt();
    console.log(prompt);
    const responseText = await prompt_ai(prompt);
    update_prompt(responseText, "coach");
    return responseText;
}


// OPENAI API HANDLING

async function prompt_ai(prompt) {
    const api_key = get_api_key();
    const url = "https://api.openai.com/v1/completions"
    const response = await fetch(url,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${api_key}`
            },
            method: "POST",
            body: JSON.stringify({
                "model": "text-davinci-003",
                "prompt": prompt,
                "max_tokens": 2000,
                "temperature": 1
            })
        }

    )
    if (response.ok) {
        const parsedResponse = await response.json();
        return parsedResponse.choices[0].text;
    }
    else {
        return null;
    }
}

function get_api_key() {
    jQuery.get("key.txt", function(txt) {
        console.log(txt);
        return txt;
    }, "text");
}
