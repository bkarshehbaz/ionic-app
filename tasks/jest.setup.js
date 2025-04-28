const fs = require('fs');
const path = require('path');

const root = path.resolve();

// Create jest.config.js
const jestConfigJS = `module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  // testRegex: '\\\\.spec\\\\.ts$',
  "verbose": true,
  setupTestFrameworkScriptFile: '<rootDir>/src/setupJest.ts',
  transformIgnorePatterns: ['node_modules/(?!@ngrx|@ionic-native|@ionic)']
};
`;
fs.writeFileSync(path.join(root, 'jest.config.js'), jestConfigJS);

// Create src/setupJest.ts
const setupJestTs = `import 'jest-preset-angular';
import './jestGlobalMocks'; // browser mocks globally available for every test
`;
fs.writeFileSync(path.join(root, 'src', 'setupJest.ts'), setupJestTs);

// Create src/jestGlobalMocks.ts
const jestGlobalMocksTs = `const mock = () => {
  let storage = {};
  return {
    getItem: key => (key in storage ? storage[key] : null),
    setItem: (key, value) => (storage[key] = value || ''),
    removeItem: key => delete storage[key],
    clear: () => (storage = {})
  };
};
Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance']
});
`;
fs.writeFileSync(path.join(root, 'src', 'jestGlobalMocks.ts'), jestGlobalMocksTs);

// Create src/tsconfig.spec.json
const tsconfigSpecJson = `{
  "extends": "../tsconfig.json",
  "include": [
    "**/*.spec.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
`;
fs.writeFileSync(path.join(root, 'src', 'tsconfig.spec.json'), tsconfigSpecJson);

