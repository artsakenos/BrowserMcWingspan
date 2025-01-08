
export async function queryGroq(userInput, callback) {
    const apiKey = localStorage.getItem('APIKEY_GROQ');
    const url = 'https://api.groq.com/openai/v1/chat/completions';

    const data = {
        messages: [
            {
                role: "system",
                content: "Tu sei il mio assistente. Ti mostrerò una pagina web su cui sto lavorando e ti farò delle domande. Rispondi in modo sintetico, chiaro e amichevole."
            },
            {
                role: "user",
                content: userInput
            }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 1,
        max_tokens: 512,
        top_p: 1,
        stream: false,
        stop: null
    };

    if (apiKey === null) {
        callback('Set your LLM API key: /set APIKEY_GROQ gsk...', null);
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
    const apiKey = localStorage.getItem('APIKEY_CEREBRAS');
    const url = 'https://api.cerebras.ai/v1/chat/completions';

    const data = {
        messages: [
            {
                role: "system",
                content: "Tu sei il mio assistente. Ti mostrerò una pagina web su cui sto lavorando e ti farò delle domande. Rispondi in modo sintetico, chiaro e amichevole."
            },
            {
                role: "user",
                content: userInput
            }
        ],
        model: "llama-3.3-70b",
        temperature: 1,
        max_completion_tokens: 512,
        top_p: 1,
        stream: false,
        stop: null
    };

    if (apiKey === null) {
        callback('Set your Cerebras API key: /set APIKEY_CEREBRAS csk...', null);
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
