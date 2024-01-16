import { render } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';

afterAll(() => jest.clearAllMocks());

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider
      store={{
        dispatch: jest.fn(),
        getState: jest.fn(),
        subscribe: jest.fn(),
        replaceReducer: jest.fn(),
        [Symbol.observable]: jest.fn(),
      }}
    >
      {children}
    </Provider>
  );
};

const customRender = (ui: ReactElement, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export { customRender as render };
