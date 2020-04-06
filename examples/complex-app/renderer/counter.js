import ReactDOM from "react-dom";
import React from "react";
import App from "../src/counter";

ReactDOM.hydrate(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
