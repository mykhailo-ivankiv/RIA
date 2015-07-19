var express = require('express');
var app = express();

app.use(express.static('dist'));

var requirejs = require('requirejs')
    .config({
      nodeRequire: require,

      paths: {
        "server": "js/server",
        "actions": "js/actions",
        "components": "js/components",
        "constants": "js/constants",
        "dispatcher": "js/dispatcher",
        "stores": "js/stores",
        "utils": "js/utils"
      }
    });

// Isomorphic routes
requirejs(["../dist/app.server"], function(renderPage) {
  app.get("/*", function (req, res, next) {

  renderPage(req.originalUrl)
      .then(function(HTML) {
        return res.send(HTML);
      })
      .catch(function(err) {
        return next(err);
      });

  });
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});