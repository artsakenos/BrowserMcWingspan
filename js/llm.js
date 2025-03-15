import { config_get } from "./config_user.js";

export async function queryLLM(userInput, callback) {
    const model_main = config_get('model_main');
    const apiKey = config_get('llm_models.<model_main>.api_key');
    const url = config_get('llm_models.<model_main>.url');
    const max_completion_tokens = 512;

    if (apiKey === null) {
        callback(`Set your LLM API key in the config_user.js or with 
            <br><b><i>/config llm_models.${model_main}.api_key gsk...</i>,</b>`, null);
        return;
    }

    const data = {
        messages: [
            {
                role: "system",
                content: config_get("prompt_main.<locale>")
            },
            {
                role: "user",
                content: userInput
            }
        ],
        model: config_get('llm_models.<model_main>.model'),
        temperature: 1,
        top_p: 1,
        stream: false,
        stop: null
    };

    // queryLLM() is ready for OpenAI style wrappers, but sometimes there are differences, handle them here. 
    switch (model_main) {
        case 'cerebras':
            data['max_completion_tokens'] = max_completion_tokens;
            break;
        default:
            data['max_tokens'] = max_completion_tokens;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        const content = jsonResponse.choices[0].message.content;

        callback(null, content);
    } catch (error) {
        callback(error, null);
    }
}
