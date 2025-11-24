import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    ignores: ['dist', 'lib', 'public']
  },
  // Config files use ES modules
  {
    files: ['**/*.config.js', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      sourceType: 'module',
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  // Source files are vanilla JS scripts
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        // Global functions defined and used across vanilla JS modules
        showTab: 'writable',
        loadRepoStats: 'writable',
        initGraph: 'writable',
        displayRepositories: 'writable',
        displayLanguageStats: 'writable',
        generateIndividualRepoTabs: 'writable',
        applyRandomGradient: 'writable',
        changeActual: 'writable',
        currentTab: 'writable',
        GenerateGraph: 'writable',
        Node: 'writable',
        // External libraries
        marked: 'readonly',
        DOMPurify: 'readonly'
      },
      sourceType: 'script',
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['warn', { 
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^_|^index$'
      }],
      'no-redeclare': 'off', // Functions are intentionally global
    },
  },
]
