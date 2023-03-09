import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from 'react-redux';
import { reducers } from "./store"
// import logger from "redux-logger"

const store = configureStore({
  reducer: { ...reducers },
  // middleware: (getDefaultMiddleware) => (getDefaultMiddleware().concat(logger))
})

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


