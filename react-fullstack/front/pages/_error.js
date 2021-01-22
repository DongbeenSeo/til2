import React from "react";
import Error from "next/error";

class MyError extends Error {
  static async getInitialProps(context) {
    const statusCode = context.res
      ? context.res.statusCode
      : context.err
      ? err.statusCode
      : null;
    console.log(`Error: ${statusCode}`);
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    return (
      <div>
        <h1>{`${statusCode}`} Error!!</h1>
        <Error statusCode={statusCode} />
      </div>
    );
  }
}

export default MyError;
