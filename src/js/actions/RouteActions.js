import Reflux from "reflux";
import {System, parseURL} from "utils/helpers";

var RouteActions = Reflux.createActions({
  "goTo": {asyncResult: true},
  "replaceRoute" : {asyncResult: false}
});

if (typeof  window !== "undefined") { //For browsers only
  window.addEventListener("popstate", (ev) => {
    RouteActions.goTo(window.location.pathname + window.location.search, true);
  })
}

RouteActions.goTo.listen (function (url) {
  let route = parseURL(url);
  System.load("components/Layout")
    .then(Layout => {
        return Layout
            .requireComponents(route)
            .then(() => route)
            .then(this.completed)
            .catch(this.failed)
      }
    );
});

export default RouteActions;