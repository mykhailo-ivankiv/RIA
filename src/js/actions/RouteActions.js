import Reflux from "reflux";

var RouteActions = Reflux.createActions({
  "goTo": {asyncResult: true},
  "replaceRoute" : {asyncResult: false}
});

if (typeof  window !== "undefined") { //For browsers only
  window.addEventListener("popstate", (ev) => {
    RouteActions.goTo(window.location.pathname + window.location.search, true);
  })
}

RouteActions.goTo.listen (function (route) {
  requirejs("components/Layout",
      (Layout) => Layout
          .requireComponents(route)
          .then(this.completed)
          .catch(this.failed)

  )

  console.log(route);
});

export default RouteActions;