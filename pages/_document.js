// Only executed on server side, and able to read our cookies

import Document, { Head, Main, NextScript } from 'next/document';

import { getServerSideToken, getUserScript } from '../lib/auth';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const props = await Document.getInitialProps(ctx);
    console.log('Document contextReq', ctx.req);

    let userData = {};

    userData = getServerSideToken(ctx.req);

    console.log('Document userData:', userData);
    return { ...props, ...userData };
  }

  render() {
    const { user } = this.props;

    console.log('User:', user);

    return (
      <html>
        <Head />

        <body>
          <Main />
          {/* putting user data into script */}
          <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }} />
          <NextScript />
        </body>
      </html>
    );
  }
}
