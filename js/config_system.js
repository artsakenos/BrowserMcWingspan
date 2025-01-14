export const config_system = {
    locale: 'it-IT', // Default language
    prompt_main: {
        "it-IT": 'Sei il mio assistente personale. Ti mostrerò una pagina web su cui sto lavorando e ti farò delle domande. Rispondi in modo sintetico, chiaro e amichevole, mantenendo un tono professionale ma accessibile.',
        "en-US": 'You are my personal assistant. I will show you a web page I am working on and ask you questions. Answer in English, in a concise, clear, and friendly manner, maintaining a professional yet approachable tone.',
        "zh-CN": '你是我的个人助手。我将向你展示我正在处理的网页并提出问题。请用简体中文回答，简洁、清晰且友好，保持专业但亲切的语气。'
    },
    llm_models: {
        groq: {
            "model": 'llama-3.3-70b-versatile',
            'api_key': null
        },
        cerebras: {
            "model": 'llama-3.3-70b',
            'api_key': null
        },
    },
    model_main: 'groq',
};

/**
 * Get a value from a nested object using a path string.
 * If the path contains placeholders like `<key>`, they are replaced with the corresponding value from the object.
 * For example, `<locale>` is replaced with `obj.locale`, and `<model_main>` is replaced with `obj.model_main`.
 * If the key doesn't exist in the object, checks localStorage for the same key.
 * If neither exists, returns null.
 *
 * @param {string} path - The path in the format "key1.key2.key3" or with placeholders like "key1.<key2>".
 * @param {object} obj - The object to search in (default: config_system).
 * @returns {*} - The value corresponding to the path, or null if not found.
 */
export function config_get(path, obj = config_system) {
    const resolvedPath = path.replace(/<(\w+)>/g, (match, key) => obj[key] || match);
    const keys = resolvedPath.split('.');
    let current = obj;
    for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
            current = current[key]; // Move deeper into the object
        } else {
            // If the path doesn't exist, check localStorage
            const localStorageValue = localStorage.getItem(resolvedPath);
            return localStorageValue !== null ? localStorageValue : null;
        }
    }

    return current;
}
