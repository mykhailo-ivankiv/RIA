import React from "react/addons";
import Layout from "components/Layout";
import {parseURL} from "utils/helpers";

import RouteStore from "stores/RouteStore";

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
    immutable       : "vendors/immutable.min",

    "isomorphic-fetch" : "vendors/fetch"
  },
  packages: []
};
`;

function render (url) {
  let route = parseURL(url);
  let cacheObj = {};

  return Layout.requireComponents(route, cacheObj)
      .then (() => {
        RouteStore.setup(url);

        return `<!doctype html>
          <html lang="en">

          <head>
            <meta charSet="UTF-8"/>
            <title>RIA</title>
            <link type="text/css" rel="stylesheet" href="/style/main.css"/>
            </head>

            <body>${React.renderToString(<Layout/>)}</body>
            <script>${requirejsConfig}</script>
            <script>
              var cache = ${JSON.stringify(cacheObj)}
            </script>
            <script src="/vendors/require.js"></script>
            <script>requirejs(["app.frontend"])</script>
          </html>
          `
      });
};

export default render;