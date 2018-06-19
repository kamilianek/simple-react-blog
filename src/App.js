import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { Provider as AlertProvider } from 'react-alert';
import { PersistGate } from 'redux-persist/integration/react';

import store from './store';
import AppRouter from './AppRouter';
import AlertTemplate from './components/AlertTemplate';

require('dotenv').config();


class App extends Component {
  render() {
    return (
      <AlertProvider template={AlertTemplate} position="top right" timeout={5000} transition="fade">
        <Provider store={store.store}>
          <PersistGate loading={null} persistor={store.persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
      </AlertProvider>
    );
  }
}

export default App;
