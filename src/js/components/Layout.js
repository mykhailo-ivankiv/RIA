import React from "react/addons";
import BEM from "utils/BEM";
import {System} from "utils/helpers";

import RouteActions from "actions/RouteActions";
var b = BEM.b("Layout");

class Layout extends React.Component {

  static requireComponents () {
    return Promise.all([
      System.load("components/Component1")
    ])
    .then(components => {
          let [Component1] = components;
          Layout.components = {Component1}
        })

    return Promise.resolve(Layout);
  }

  constructor (props) {
    super();
    this.state = {};
  }

  componentWillMount () {
    this.unsubscribeList = [

    ];
  }

  componentWillUnmount () {
    this.unsubscribeList.map((fn) => fn());
  }

  componentDidMount () {}

  switchLayout () {
    RouteActions.goTo("/component2");
  }

  render () {
    let {Component1} = Layout.components;

    return <div className={b()}>
        Root component
        <Component1/>

        <button onClick={this.switchLayout.bind(this)}>GoTo component 2</button>
      </div>;
  }
}

export default Layout;

