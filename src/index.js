import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";

import { Provider } from "react-redux";
import generateStore from "./redux/store";

import { BrowserRouter as Router } from "react-router-dom";

const store = generateStore();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
