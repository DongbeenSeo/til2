import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import propTypes from 'prop-types';

const NodeBird = ({ Component }) => {
  return (
    <>
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
    </>
  );
};

NodeBird.propTypes = {
  Component: propTypes.any,
};

export default NodeBird;
