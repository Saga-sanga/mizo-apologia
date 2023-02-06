import '../styles/globals.css'

import App from "next/app";
import Head from "next/head";
import Script from "next/script";
import { createContext } from "react";
import { getStrapiMedia } from "../lib/media";
import { fetchAPI } from "../lib/api";

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const { global }  = pageProps;

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content={global.attributes.defaultSeo.metaDescription}/>
        <title>{global.siteName}</title>
        <link rel="shortcut icon" href={getStrapiMedia(global.attributes.favicon)} />
      </Head>

      {/* UI Kits */}

      <Script
        id='uikit'
        src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js"
        strategy='beforeInteractive'
      />
      <Script
        id='uikit-icons'
        src="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js"
        strategy='beforeInteractive'
      />
      <Script
        id='uikit-ajax'
        src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js"
        strategy='beforeInteractive'
      />

      {/* Google Tag Manager */}

      <Script
        id='google-tagmanager'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TS2GP8F');`,
        }}
      />
      <GlobalContext.Provider value={global.attributes}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </div>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/global", {
    populate: {
      favicon: true,
      defaultSeo: {
        populate: true
      }
    }
  });

  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;