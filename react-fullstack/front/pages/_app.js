import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import withRedux from "next-redux-wrapper";

import AppLayout from "../components/AppLayout";

import reducer from "../reducers";

const NodeBird = ({ Component, store }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>NodeBird</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.12/antd.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.12/antd.js" />
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </Provider>
  );
};

export default withRedux((initState, options) => {
  const middlewares = [];
  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
})(NodeBird);
