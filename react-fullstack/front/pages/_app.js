import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import createSagaMiddleware from "redux-saga";
import axios from "axios";

import AppLayout from "../components/AppLayout";

import reducer from "../reducers";
import rootSaga from "../sagas";
import { LOAD_USER_REQUEST } from "../reducers/user";

const NodeBird = ({ Component, store, pageProps }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>NodeBird</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.12/antd.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
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
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : "";
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
    // 클라이언트에서 요청을 보낼 때는 브라우저가 쿠키를 같이 동봉
    // server-side rendering이면 브라우저에서 요청을 보내는 것이 아니라 front서버에서 요청을 보내기 때문에 직접 api요청에 쿠키를 집어넣어야 한다.
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  if (Component.getInitialProps) {
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
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export default withRedux(configureStore)(withReduxSaga(NodeBird));
