import Head from 'next/head';
import Header from './header';

const Layout = (props) => (
  <>
    <Head>
      <script
        type="text/javascript"
        src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/0.10.0/lodash.min.js"
      ></script>

      {/* <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/lodash/4.17.4/lodash.min.js"
      ></script> */}
      <script
        type="text/javascript"
        src="https://d3js.org/d3.v4.min.js"
      ></script>
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/d3-dtree@2.4.1/dist/dTree.min.js"
      ></script>
      <title>With Cookies</title>
    </Head>

    <Header />

    <main>
      <div className="container">{props.children}</div>
    </main>

    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
        height: 100vh;
      }
      .container {
        // max-width: 42rem;

        margin: 0 auto;
        padding: 2rem 1.25rem;
        height: 95vh;
      }
    `}</style>
  </>
);

export default Layout;
