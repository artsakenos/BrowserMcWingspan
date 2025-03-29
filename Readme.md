# Browser Assistant 🚀

A lightweight, hackable browser assistant that lives in your sidebar,
ingests your page whenever you ask, and gives you AI-powered browsing superpowers, 
for free.

## ✨ Key Features

- **Seamless Integration**: Lives right in your browser's sidebar for instant access, *no need to open a new tab to chat with you LLM assistant*!
- **Smart Interactions**: Summarize pages, translate content, and more
- **Lightning Fast**: Powered by Groq, Cerebras or your favorite LLMs for exceptional performance
- **Zero Config**: Get started in minutes with free LLM tiers - no credit card or server setup needed
- **Highly Hackable**: Simple, clean codebase designed for easy customization

**Prerequisites**
- A modern web browser (Chrome, Edge, or compatible)
- API keys for your preferred LLM service (e.g., Cerebras, Groq, DeepSeek, Cohere)


## 🎯 Why Another Browser Assistant?

While there are many AI assistants out there, Browser Mc Wingspan focuses on simplicity and hackability. 
I believe the best tools are the ones you can easily make your own. 
That's why I've made customization as straightforward as adding your code to `index::handleResponse` 
and using the built-in helpers for page content and direct LLM interactions.
Check the prompts and further configurations inside `config_system.js`.


## 🛠️ Installation - Developer Mode

If you install the extension in developer mode, you need to:

1. Download / clone it from the [repository](https://github.com/artsakenos/BrowserMcWingspan).

2. **Configure Your Settings**
   - Edit the `config_user.js` configuration file
   - Add your API keys and preferences
   - But, you can use the `/config` [command](#commands) to write or override those values later.

3. **Install the Extension**
   - Open your browser's extension page:
     - Chrome: `chrome://extensions`
     - Edge: `edge://extensions`
   - Enable **Developer Mode**
   - Click **Load Unpacked Extension**
   - Select the project folder
   - Use the `/config` [command](#commands) to write or override the settings. 
     See [Configuration](#configuration).

## 🛠️ Installation - From the Chrome Web Store

1. **Download the Extension** - from the [chrome web store](https://chromewebstore.google.com/detail/ejgkojeeddpkfanaooaoegokcihfgkef).
2. **Configure your favorite LLMs** - See [Configuration](#configuration).


## 💡 Usage Guide

Once installed, click the extension icon to open the sidebar interface:

![Screenshot of the user interface](./images/screen_pippo.png)

### Key Features
- **Page Analysis**: Get instant summaries and insights
- **Translation**: Break down language barriers
- **Voice Interface**: Chat using your microphone (currently being fixed)
- **Custom Actions**: Extend functionality as needed

### Configuration

To use the extension you need to set some configuration once only.
To interact with an LLM you need to choose the model and provide the API Keys.
Supported LLMs: *groq*, *cerebras*, *deepseek*, *cohere*. Default: *cerebras*.

* `/config locale it-IT`  # The System Locale, optional, default = en-US.
* `/config model_main cerebras` # Choose your favorite LLM, optional, default: cerebras.
* `/config llm_models.cerebras.api_key gsk_...` # Configure your chosen LLM API Key, mandatory.
* `/config` # Show the current configuration.

Note that values in local storage have priority over system and user configuration.

### Commands
| Command               | Description                                      |
|-----------------------|--------------------------------------------------|
| `{query}`             | Chat with your LLM                               |
| `/help`, `/?`         | Opens this Usage Guide page section              |
| `/clear`              | Clear chat history                               |
| `/llm {query}`        | Direct LLM query about the page                  |
| `/html`               | View page HTML length                            |
| `/text`               | Show page text excerpt                           |
| `/testedit`           | Test page editing (try on Sardinia pages)        |
| `/config {var}`       | Show the current configs, or for `var`, if set   |
| `/config {var} value` | Set the current config for `var`                 |

| Config Examples                                | Description                                             |
|------------------------------------------------|---------------------------------------------------------|
| `/config`                                      | Check the current configuration and preferences         |
| `/config locale it-IT`                         | The System Locale, optional, default = en-US.           |
| `/config model_main cerebras`                  | Choose your favorite LLM, optional, default: cerebras.  |
| `/config llm_models.cerebras.api_key gsk_...`  | Configure your chosen LLM API Key, mandatory.           |
| `/config tts on` `/config tts off`             | Turns the voice ON, OFF.                                |


### Demo Video
[![Watch the demo](https://img.youtube.com/vi/Ill-eXFV-mE/0.jpg)](https://www.youtube.com/watch?v=Ill-eXFV-mE)

## 🔋 Credits & Acknowledgments

- Icons by [Freepik](https://www.freepik.com/icon/customer-service_5617594#fromView=search&page=1&position=58&uuid=d5f46cdc-14ae-4819-92ce-dbfcc156ea7a)
- Powered by [Groq](https://groq.com), [Cerebras](https://cerebras.ai) Fast Inference LLMs, and others.

## 🚧 Known Issues & Roadmap

### Current Limitations
- Microphone permissions may fail in some cases
- Large web pages might cause performance issues
- API key validation could be more robust

### Upcoming Improvements
- [x] Improved documentation
- [x] Remove llm.js code redundancy
- [x] Enhanced error handling for invalid API keys
- [ ] Microphone permission fix
- [ ] Handle Large page and context (Error 413 on most llms)
- [x] Add Cohere, Ollama, OpenAi, Anthropic, Google... wrappers
- [ ] Add an agentic Tool Library and Actions
- [ ] Chat History in Context
- [x] Remove punctuation from tts
- [ ] Add informations to the /config command
- [x] Make locale changeable from local storage

## 🤝 Contributing

Your contributions are welcome! Feel free to:
- Open issues for bugs or suggestions
- Submit pull requests
- Contact the maintainers with questions
- Share your use cases and improvements

---

*Happy browsing with Browser Mc Wingspan! 🚀*
