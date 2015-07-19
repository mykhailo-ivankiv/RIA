import React from "react/addons";
import Layout from "components/Layout";

var requirejsConfig = `
var require = {
  waitSeconds: 0, //http://stackoverflow.com/questions/20736547/ripple-uncaught-error-load-timeout-for-modules-app-http-requirejs-org-docs
  shim: {
    "isomorphic-fetch"     : { exports : 'fetch'},
  },

  baseUrl: "/",
  paths: {
    "actions"    : "js/actions",
    "components" : "js/components",
    "constants"  : "js/constants",
    "dispatcher" : "js/dispatcher",
    "stores"     : "js/stores",
    "utils"      : "js/utils",

    reflux          : "vendors/reflux",
    react           : "vendors/react",
    "react/addons"  : "vendors/react-with-addons",

    "isomorphic-fetch" : "vendors/fetch"
  },
  packages: []
};
`;

function render (url, user, preferences) {

  return Promise.resolve( `
        <!doctype html>
        <html lang="en">

        <head>
          <meta charSet="UTF-8"/>
          <title>Rove.me</title>
        </head>

        <body>${React.renderToString(<Layout route="/"/>)}</body>
        <script>${requirejsConfig}</script>
        <script src="/vendors/require.js"></script>
        <script>requirejs(["app.frontend"])</script>

        </html>
      `);
};

export default render;