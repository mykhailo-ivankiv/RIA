import React from "react/addons";
import Layout from "components/Layout";

Layout
    .requireComponents()
    .then(() => React.render(<Layout/>, document.body));

