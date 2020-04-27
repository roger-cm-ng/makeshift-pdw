/* global window document */
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router /* , Route */} from 'react-router-dom';
import ReloadCombinedReducers from './reload-combined-reducers';
import { handleDefaults } from '../../helpers/utils';
import Main from '../main/main';
import './core.scss';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default class EntryApp {
  constructor(element, dynamicOptions) {
    const defaults = {};
    this.element = element;
    this.options = handleDefaults(defaults, dynamicOptions);
    this.renderElm();
  }

  renderElm() {
    const store = createStoreWithMiddleware(
      ReloadCombinedReducers,
      window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    ReactDom.render(
      <Provider store={store}>
        <Router>
          <div>
            <Main />
          </div>
        </Router>
      </Provider>,
      document.querySelector(this.element)
    );
  }
}

window.EntryApp = EntryApp;
