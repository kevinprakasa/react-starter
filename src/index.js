import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "normalize.css";

import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";

import "./index.css";

import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";

const target = document.querySelector("#root");
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  target
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
