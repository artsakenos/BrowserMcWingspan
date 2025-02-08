# Browser Mc Wingspan 🚀

A lightweight, hackable browser assistant that lives in your sidebar. Get AI-powered browsing superpowers without the complexity
and make it through the [Eternal September](https://en.wikipedia.org/wiki/Eternal_September) unscathed.

## ✨ Key Features

- **Seamless Integration**: Lives right in your browser's sidebar for instant access
- **Smart Interactions**: Summarize pages, translate content, and more
- **Lightning Fast**: Powered by Groq, Cerebras or your favorite LLMs for exceptional performance
- **Zero Config**: Get started in minutes with free LLM tiers - no credit card or server setup needed
- **Highly Hackable**: Simple, clean codebase designed for easy customization

## 🎯 Why Another Browser Assistant?

While there are many AI assistants out there, Browser Mc Wingspan focuses on simplicity and hackability. 
We believe the best tools are the ones you can easily make your own. 
That's why we've made customization as straightforward as adding your code to `index::handleResponse` 
and using our built-in helpers for page content and LLM interactions.

## 🛠️ Installation

*Note: The extension is currently in development and not yet available through official extension stores.*
Download / clone it from the [repository](https://github.com/artsakenos/BrowserMcWingspan).

### Prerequisites
- A modern web browser (Chrome, Edge, or compatible)
- API keys for your preferred LLM service (Cerebras and/or Groq)

### Setup Steps

1. **Configure Your Settings**
   - Copy `config_user (template).js` to `config_user.js`
   - Add your API keys and preferences
   - You can use the `/set` command in the extension to override those values later:
     ```
     /set llm_models.cerebras.api_key csk-...  # for Cerebras
     /set llm_models.groq.api_key gsk-...      # for Groq
     ```

2. **Install in Developer Mode**
   - Open your browser's extension page:
     - Chrome: `chrome://extensions`
     - Edge: `edge://extensions`
   - Enable **Developer Mode**
   - Click **Load Unpacked Extension**
   - Select the project folder

## 💡 Usage Guide

### Getting Started
Once installed, click the extension icon to open the sidebar interface:

![Screenshot of the user interface](./images/screen_pippo.png)

### Key Features
- **Page Analysis**: Get instant summaries and insights
- **Translation**: Break down language barriers
- **Voice Interface**: Chat using your microphone (currently being fixed)
- **Custom Actions**: Extend functionality as needed

### Available Commands
| Command | Description |
|---------|-------------|
| `/clear` | Clear chat history |
| `/llm {query}` | Direct LLM query about the page |
| `/html` | View page HTML length |
| `/text` | Show page text excerpt |
| `/testedit` | Test page editing (try on Sardinia pages) |
| `/set {var}` | Configure settings |
| `/get {var}` | Retrieve settings |

### Demo Video
[![Watch the demo](https://img.youtube.com/vi/Ill-eXFV-mE/0.jpg)](https://www.youtube.com/watch?v=Ill-eXFV-mE)

## 🔋 Credits & Acknowledgments

- Icons by [Freepik](https://www.freepik.com/icon/customer-service_5617594#fromView=search&page=1&position=58&uuid=d5f46cdc-14ae-4819-92ce-dbfcc156ea7a)
- Powered by [Groq](https://groq.com) and [Cerebras](https://cerebras.ai) LLMs

## 🚧 Known Issues & Roadmap

### Current Limitations
- Microphone permissions may fail in some cases
- Large web pages might cause performance issues
- API key validation could be more robust

### Upcoming Improvements
- [x] Improved documentation
- [x] Remove llm.js code redundancy
- [ ] Enhanced error handling for invalid API keys
- [ ] Microphone permission fix
- [ ] Large page optimization (Error 413 on most llms)
- [ ] Add Cohere, Ollama, OpenAi, Anthropic, Google... wrappers
- [ ] Add a Tool Library and Actions
- [ ] Chat History in Context

## 🤝 Contributing

Your contributions are welcome! Feel free to:
- Open issues for bugs or suggestions
- Submit pull requests
- Contact the maintainers with questions
- Share your use cases and improvements

---

*Happy browsing with Browser Mc Wingspan! 🚀*
