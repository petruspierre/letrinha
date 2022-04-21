import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="pt">
        <Head>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400&family=Source+Sans+3:ital,wght@0,900;1,900&display=swap"
            rel="stylesheet"
          />

          <meta property="og:type" content="website" />
          <meta property="og:title" content="Letrinha" />
          <meta
            property="og:description"
            content="Letrinha é um jogo online de palavras, venha se desafiar diariamente!"
          />
          <meta property="og:site_name" content="Letrinha" />
          <meta property="og:url" content="https://letrinha.xyz/" />

          <meta name="application-name" content="Letrinha" />
          <meta
            name="description"
            content="Letrinha é um jogo online de palavras, venha se desafiar diariamente!"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="assets/logo/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="assets/logo/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="assets/logo/favicon-16x16.png"
          />
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
