import React from "react";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import createSagaMiddleware from "redux-saga";
import axios from "axios";
import { Helmet } from "react-helmet";
import App from "next/app";

import AppLayout from "../components/AppLayout";

import reducer from "../reducers";
import rootSaga from "../sagas";
import { LOAD_USER_REQUEST } from "../reducers/user";

class NodeBird extends App {
  static async getInitialProps(context) {
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
  }
  render() {
    const { Component, store, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Helmet
          title="NodeBird"
          htmlAttributes={{ lang: "ko" }}
          meta={[
            {
              charSet: "UTF-8",
            },
            {
              name: "viewport",
              content: "width=device-width",
            },
            {
              httpEquiv: "X-UA-Compatible",
              content: "IE=edge",
            },
            {
              name: "description",
              content: "Nodebird SNS",
            },
            {
              name: "og:title",
              content: "My SNS",
            },
            {
              name: "og:description",
              content: "Nodebird SNS",
            },
            {
              property: "og:type",
              content: "website",
            },
          ]}
          link={[
            {
              rel: "stylesheet",
              href:
                "https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.12/antd.css",
            },
            {
              rel: "stylesheet",
              type: "text/css",
              charSet: "UTF-8",
              href:
                "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
            },
            {
              rel: "stylesheet",
              type: "text/css",
              href:
                "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css",
            },
          ]}
          script={[
            {
              src:
                "https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.12/antd.js",
            },
          ]}
        />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Provider>
    );
  }
}

const configureStore = (initState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    (store) => (next) => (action) => {
      next(action);
    },
  ];
  // custom middleware (리덕스 사가의 로그를 나타내어 에러를 찾아낼수 있다.)

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
