import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            type="text/javascript"
            src="https://2pay-js.2checkout.com/v1/2pay.js"
            defer
          ></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
