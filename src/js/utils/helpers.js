var load = (path) => new Promise ((resolve, reject) =>requirejs([path], resolve));

export var System = {load};


export function parseURL (url) {
  var pathStr = url.match(/^[\-\w\/]+(\?)?/)[0];
  var queryStr = url.replace(pathStr, "");

  if (pathStr[pathStr.length - 1] === "?"){
    pathStr = pathStr.substr(0, pathStr.length - 1);
  }

  var paths = pathStr.split("/");
  paths.shift();

  var query = {};

  if (queryStr) {
    queryStr.split("&").map((pair) => {
      var key = pair.split("=")[0],
          value = decodeURI(pair.split("=")[1]);
      query[key] = value;
    });
  }

  return {pathStr, paths, queryStr, query};
}

export function isEmpty (obj) {
  return (
      (obj instanceof Array && obj.length === 0) ||
      (typeof obj === "object" && Object.keys(obj).length === 0)
  );
}