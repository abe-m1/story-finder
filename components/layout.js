import Head from 'next/head';
import Header from './header';

const Layout = (props) => (
  <>
    <Head>
      <title>Story App</title>
      <script src="https://unpkg.com/opencage-api-client"></script>
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_KEY}&libraries=places`}
      ></script>
    </Head>

    <Header />

    <main>
      <div className="container" style={{ height: '94vh' }}>
        {props.children}
      </div>
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
        // padding: 2rem 1.25rem;
      }
    `}</style>
  </>
);

export default Layout;
