import React from "react/addons";
import Layout from "components/Layout";
import RouteStore from "stores/RouteStore";

Layout
  .requireComponents(RouteStore.getRoute())
  .then(() => React.render(<Layout/>, document.body));

