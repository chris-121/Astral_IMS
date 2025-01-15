import {
    Links,
    Meta,
    Outlet,
    Scripts,
  } from "@remix-run/react";

import { AppProvider } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';

  
  export default function App() {
    return (
      <html>
        <head>
          <link
            rel="icon"
            href="data:image/x-icon;base64,AA"
          />
          <link rel="preconnect" href="https://cdn.shopify.com/" />
          <link
            rel="stylesheet"
            href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
          />
          <Meta />
          <Links />
        </head>
        <body>
        <AppProvider i18n={translations}>

          <Outlet />
  
          <Scripts />
          </AppProvider>

        </body>
      </html>
    );
  }
  