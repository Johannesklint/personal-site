import React from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <script src="https://www.gstatic.com/firebasejs/7.15.1/firebase-app.js"></script>
          <script src="https://www.gstatic.com/firebasejs/7.15.1/firebase-analytics.js"></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
