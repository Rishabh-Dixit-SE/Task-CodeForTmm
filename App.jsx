import React from "react";

import { Provider } from "react-redux";
import store from "./store";
import Page from "./Page";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Page />
      </div>
    </Provider>
  );
};

export default App;
