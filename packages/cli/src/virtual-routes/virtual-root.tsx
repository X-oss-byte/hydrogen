// This file is the root of every virtual route tree.
// It does not affect the routes from the user app.

import type {LinksFunction} from '@shopify/remix-oxygen';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react';
import styles from './assets/styles.css';
import favicon from './assets/favicon.svg';
import {Layout} from './components/Layout.jsx';

export const links: LinksFunction = () => {
  return [
    {rel: 'stylesheet', href: styles},
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Hydrogen</title>
        <meta
          name="description"
          content="A custom storefront powered by Hydrogen"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Hydrogen</title>
        <meta
          name="description"
          content="A custom storefront powered by Hydrogen"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <div className="route-error">
            <h1>Please report this error</h1>
            <h2>{errorStatus}</h2>
            {errorMessage && (
              <fieldset>
                <pre>{errorMessage}</pre>
              </fieldset>
            )}
          </div>
        </Layout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
