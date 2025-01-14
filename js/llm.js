import { config_get } from "./config_user.js";

export async function queryGroq(userInput, callback) {
    const apiKey = config_get('llm_models.groq.api_key');
    const url = 'https://api.groq.com/openai/v1/chat/completions';

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
        model: config_get('llm_models.groq.model'),
        temperature: 1,
        max_tokens: 512,
        top_p: 1,
        stream: false,
        stop: null
    };

    if (apiKey === null) {
        callback('Set your LLM API key in the config_user.js or with <i>/set llm_models.groq.api_key gsk...</i>', null);
        return;
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


export async function queryCerebras(userInput, callback) {
    const apiKey = config_get('llm_models.<model_main>.api_key');
    const url = 'https://api.cerebras.ai/v1/chat/completions';

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
        max_completion_tokens: 512,
        top_p: 1,
        stream: false,
        stop: null
    };

    if (apiKey === null) {
        callback('Set your LLM API key in the config_user.js or with <i>/set llm_models.cerebras.api_key csk...</i>', null);
        return;
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
