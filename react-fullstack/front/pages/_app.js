import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import withRedux from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";

import AppLayout from "../components/AppLayout";

import reducer from "../reducers";
import rootSaga from "../sagas";

const NodeBird = ({ Component, store, pageProps }) => {
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
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
};

NodeBird.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  if (Component.getInitialProps) {
    console.log(ctx);
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

const configureStore = (initState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  // const composeEnhancers =
  //   (typeof window !== 'undefined' &&
  //     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  //   compose;

  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f) => f
        );

  const store = createStore(reducer, initState, enhancer);
  sagaMiddleware.run(rootSaga);

  return store;
};

export default withRedux(configureStore)(NodeBird);
