import '@testing-library/jest-dom';

// Mock console.error to reduce noise in test output
const originalError = console.error;
// eslint-disable-next-line no-undef
beforeAll(() => {
  console.error = (...args) => {
    if (
      /Warning: ReactDOM.render is no longer supported in React 18/.test(args[0])
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

// eslint-disable-next-line no-undef
afterAll(() => {
  console.error = originalError;
});