export const config_system = {
    locale: 'it-IT', // Default language
    prompt_main: {
        "it-IT": 'Sei il mio assistente personale per l\'esplorazione web. Vai direttamente al punto. Elimina saluti, convenevoli o frasi introduttive superflue. Fornisci immediatamente risposte concise, precise e strettamente pertinenti alla domanda. Concentrati sul contenuto utile e rilevante, senza perdite di tempo.',
        "en-US": 'You are my web browsing assistant. Get straight to the point. Eliminate greetings, pleasantries, or unnecessary introductory phrases. Provide immediate, concise, precise answers directly relevant to the question. Focus on useful and relevant content without wasting words.',
        "zh-CN": '你是我的网页浏览助手。直接切入主题。消除问候语、客套话和不必要的引导性词语。立即给出简洁、精准且与问题直接相关的答复。专注于有用和相关的内容，不要浪费时间。'
    },
    llm_models: {
        groq: {
            "url": "https://api.groq.com/openai/v1/chat/completions",
            "model": 'llama-3.3-70b-versatile',
            'api_key': null
        },
        cerebras: {
            "url": "https://api.cerebras.ai/v1/chat/completions",
            "model": 'llama-3.3-70b',
            'api_key': null
        },
        deepseek: {
            "url": "https://api.deepseek.com/chat/completions",
            "model": 'deepseek-chat',
            'api_key': null
        },
        cohere: {
            "url": "https://api.cohere.com/v2/chat",
            "model": 'dcommand-r-plus-08-2024',
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
