import { config_system, config_get } from './config_system.js';

// User Override Configurations. Fill the values where needed.
config_system.locale = 'en-US'; // User Language
config_system.model_main = 'cerebras'; // Main Model, choose among llm_models keys
config_system.llm_models.cerebras.api_key = null;
config_system.llm_models.groq.api_key = null;

// Export the modified config_system object
export { config_system, config_get };