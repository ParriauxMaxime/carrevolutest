import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router'; // import separately to reduce bundle size
import browserHistory from 'react-router/lib/browserHistory'; // import separately to reduce bundle size
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import promise from 'redux-promise';

import theme from './theme';
import reducers from './reducers';
import routes from './routes';

const appRootEl = document.getElementById('app');

if (appRootEl) {
  const store = applyMiddleware(promise)(createStore)(reducers);
  const router = <Router history={browserHistory} routes={routes} />;
  if (process.env.NODE_ENV == 'production') {
    ReactDOM.render(<Provider store={store}>{router}</Provider>, appRootEl);
  } 
  else {
    
    const AppContainer = require('react-hot-loader').AppContainer;
    const render = () => {
      ReactDOM.render(
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <AppContainer>{router}</AppContainer>
          </MuiThemeProvider>
        </Provider>, appRootEl
      );
    };
    if (module.hot) {
      module.hot.accept('./reducers', () => { store.replaceReducer(reducers); });
      module.hot.accept('./routes', render);
    }
    render();
  }
}
