import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

const APP_DESCRIPTION =
  "Letrinha é um jogo online de palavras, venha se desafiar diariamente!";
const APP_NAME = "Letrinha";

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
          <meta charSet="utf-8" />

          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#59657D" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#423E4F" />

          <link
            rel="apple-touch-icon"
            href="/assets/logo/apple-touch-icon.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assets/logo/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/assets/logo/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          {/* <link
            rel="mask-icon"
            href="/assets/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          /> */}
          <link rel="shortcut icon" href="/assets/logo/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://letrinha.xyz" />
          <meta name="twitter:title" content={APP_NAME} />
          <meta name="twitter:description" content={APP_DESCRIPTION} />
          <meta
            name="twitter:image"
            content="https://letrinha.xyz/assets/logo/android-chrome-192x192.png"
          />
          <meta name="twitter:creator" content="@petruscrf" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={APP_NAME} />
          <meta property="og:description" content={APP_DESCRIPTION} />
          <meta property="og:site_name" content={APP_NAME} />
          <meta property="og:url" content="https://letrinha.xyz" />
          <meta
            property="og:image"
            content="https://letrinha.xyz/assets/logo/apple-touch-icon.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
