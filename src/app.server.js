import React from "react/addons";
import Layout from "components/Layout";
import {parseURL} from "utils/helpers";

import RouteStore from "stores/RouteStore";
import {setupCache, getCache} from "stores/cache"

var requirejsConfig = `
var require = {
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

        setupCache(cacheObj);

        return `<!doctype html>
          <html lang="en">

          <head>
            <meta charSet="UTF-8"/>
            <title>RIA</title>
            <link type="text/css" rel="stylesheet" href="/style/main.css"/>
            <script>
              var cache = ${JSON.stringify(cacheObj)};
              console.log(cache, ${JSON.stringify(cacheObj)}, "server.render");
            </script>
            </head>

            <body>${React.renderToString(<Layout/>)}</body>
            <script>${requirejsConfig}</script>

            <script src="/vendors/require.js"></script>
            <script>requirejs(["app.frontend"])</script>
          </html>
          `
      });
};

export default render;