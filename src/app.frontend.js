import React from "react/addons";
import Layout from "components/Layout";

Layout
    .requireComponents()
    .then(Layout => React.render(<Layout/>, document.body));

