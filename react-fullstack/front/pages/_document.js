import React, { Component } from 'react';
import Document, { Main, NextScript } from 'next/document';
import { Helmet, HelmetProps } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(context) {
    const initialProps = await Document.getInitialProps(context);
    const sheet = new ServerStyleSheet();
    const page = context.renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return {
      ...initialProps,
      ...page,
      helmet: Helmet.renderStatic(),
      styleTags,
    };
  }

  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();

    return (
      <div>
        <html {...htmlAttrs} lang='ko'>
          <head>
            {this.props.styleTags}
            {Object.values(helmet).map((el) => el.toComponent())}
          </head>
          <body {...bodyAttrs}>
            <Main />
            {process.env.NODE_ENV === 'production' && (
              <script src='https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated' />
            )}
            <NextScript />
          </body>
        </html>
      </div>
    );
  }
}
