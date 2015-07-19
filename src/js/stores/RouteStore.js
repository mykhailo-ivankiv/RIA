import Reflux from "reflux";
import RouteActions from "actions/RouteActions";

import {parseURL, isEmpty} from "utils/helpers";

var _navigationHistory = [];
var _currentPath = "/";

var RouteStore = Reflux.createStore({
  convertToURL (obj) {
    return "/"
        + obj.paths.join("/")
        + (!isEmpty(obj.query)
            ? "?" + Object.keys(obj.query).map(key => key + "=" + obj.query[key]).join("&")
            : "");
  },

  setup (url) {
    _currentPath = url;
  },

  init (data) {
    if (typeof window !== "undefined") {
      _currentPath = window.location.href.replace(window.location.origin, "");
    }
  },

  listenables: [RouteActions],

  onGoTo (url, historyNavigation) {
    url = typeof url !== "string"
            ? this.convertToURL(url)
            : url;

    if (!historyNavigation) {
      _navigationHistory.push(_currentPath);
      window.history.pushState(null, "", url); //TODO: fix on "back" navigation;
    }

    _currentPath = url;

    //TODO: add component loading.
    //TODO: add data loading.
    // Maybe make sense to move data and components loading into action's logic.

    this.trigger();
  },

  replaceRoute (url) {
    url = typeof url !== "string"
        ? this.convertToURL(url)
        : url;

    _currentPath = url;

    window.history.replaceState(null, "", url);
    this.trigger();
  },

  getRoute () {
    return parseURL (_currentPath);
  },

  getPrevRoute () {
    var prevRoute = _navigationHistory[_navigationHistory.length - 1];

    return prevRoute ?  parseURL(prevRoute) : undefined;
  }

});

export default RouteStore;