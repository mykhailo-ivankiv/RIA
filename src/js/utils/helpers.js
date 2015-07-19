import moment from "moment";
import fetch from "isomorphic-fetch";

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError("Array.prototype.find called on null or undefined");
    }
    if (typeof predicate !== "function") {
      throw new TypeError("predicate must be a function");
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}


//Optimize scroll event
if (typeof window !== "undefined") {
  (function() {
    var throttle = function(type, name, obj) {
      obj = obj || window;
      var running = false;
      var func = function() {
        if (running) { return; }
        running = true;
        requestAnimationFrame(function() {
          obj.dispatchEvent(new CustomEvent(name));
          running = false;
        });
      };
      obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle ("scroll", "optimizedScroll");
  })();
}

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

export function getTimeRange (timestring) {
  let start, end;

  if (timestring) {
    let [from, to] = timestring.split("-");
    start = moment(from, "MMMDD");
    if (start < moment()) {start.add(1, "year")}

    end = moment(to, "MMMDD") < start
            ? moment(to, "MMMDD").add(1, "year")
            : moment(to, "MMMDD");
  } else {
    start = moment().add(3, "month");
    end = moment().add(7, "month");
  }

  return {start, end};
}

export function getPageData (routes) {
  let timeRegExp = /^\w{3}\d{2}-\w{3}\d{2}$/;

  let name, timeString, destinationSlug, reasonId, shortUserId, subpage;

  if (routes.paths[0] === "to") {
    name = "destination";
    destinationSlug = routes.paths[1];

    if (timeRegExp.test(routes.paths[2])) {
      timeString = routes.paths[2];
    } else if (routes.paths[2]) {
      name = "reason";
      reasonId = routes.paths[2];
    }

    if (routes.paths[2] === "add-review" || routes.paths[3] === "add-review") {
      name = "add-review";
    } else if (routes.paths[2] === "suggest-reason" || routes.paths[3] === "suggest-reason") {
      name = "suggest-reason";
    }
  } else if (routes.paths[0] === "in") {
    name = "region";
    subpage = routes.paths[1] || "europe";

  } else if (routes.paths[0] === "" || timeRegExp.test(routes.paths[0])) {
    name = "home";
    timeString = routes.paths[0];
  } else if (routes.paths[0] === "search") {
    name = "search";
  } else if (routes.paths[0] === "u") {
    if (routes.paths[1] === "register") {
      name = "register";
    } else {
      name = "user";
      shortUserId = routes.paths[1];
      subpage = routes.paths[2] || "destinations";
    }

  } else if (routes.paths[0] = "static") {
    if (routes.paths[1] === "about") {
      name = "about";
    } else if (routes.paths[1] === "terms") {
      name = "terms";
    } else if (routes.paths[1] === "policy") {
      name = "policy";
    }
  }

  return {name, timeString, destinationSlug, reasonId, shortUserId, subpage};
}

export function searchYPointAtPath (path, xPoint) {
  var pathLength = path.getTotalLength();
  var resultPoint;
  var pointer = 0;
  var currentPathLength = pathLength / 2;
  var delimiter = currentPathLength;

  if (xPoint < path.getPointAtLength(pathLength).x && xPoint > path.getPointAtLength(0).x){

    resultPoint = path.getPointAtLength(currentPathLength);

    //Binary Search
    while (resultPoint.x.toFixed(1) !== xPoint.toFixed(1)){
      delimiter = delimiter / 2;
      pointer += 1;

      resultPoint = path.getPointAtLength(currentPathLength);

      if (resultPoint.x < xPoint) {
        currentPathLength += delimiter;
      } else if (resultPoint.x > xPoint) {
        currentPathLength -= delimiter;
      }
    }
    return path.getPointAtLength(currentPathLength);
  }
}

function stringifyQueryParam (param) {
  return (typeof param === "string" || typeof param === "number")
    ? param
    : param instanceof Array
      ? param.join(",")
      : "";
};

export var fromJSToQuery = (obj) => Object.keys(obj)
    .map(key => {
      let value = stringifyQueryParam(obj[key]);
      return value ? key + "=" + value : "";
    })
    .filter(values => values)
    .join("&");

// Helpers for data fetching.
export var getData = (url) => fetch(url, {credentials: "same-origin"})
                                .then(response => {
                                  if (response.status >= 400) {throw new Error("Bad response from server"); }
                                  return response.json();
                                })
                                .catch(err => console
                                                .error(`Error with data loading:\n URL: ${url} \n ${err}`));

export var cacheData = (data, properties) => {
                            let {key, cache, rawFlag, context} = properties;

                            //Cache promise. Prevent double fetch same data;
                            if (typeof window !== "undefined") {cache[key] = data; }

                            return Promise.resolve(data)
                                .then(data => {
                                  if (typeof window !== "undefined") {
                                    cache[key] = data || {};
                                    context.trigger(data);
                                  }
                                  return data;
                                })
                                .then (data => rawFlag ? {[key]: data} : data)
                                .catch(err => console.error("Error with data caching", err));
                          }

export var fetchData = (url, properties) => cacheData(getData(url), properties);
