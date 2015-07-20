import React from "react/addons";
import BEM from "utils/BEM";
import {System} from "utils/helpers";

import Link from "components/Link";

import RouteActions from "actions/RouteActions";
import RouteStore from "stores/RouteStore";
var b = BEM.b("Layout");

class Layout extends React.Component {
  static components = {}
  static requireComponents (route) {
    console.log(route);

    var components = [];

    if (route === "/component2" || route.pathStr === "/component2") {
      components.push(System
          .load("components/Component2")
          .then(Component2 => {
                console.log(Component2);
                Layout.components["Component2"] = Component2;
                return Component2;
              })
      )
    } else {
      components.push(System
          .load("components/Component1")
          .then(Component1 => {
                Layout.components["Component1"] = Component1;
                return Component1;
              })
      );
    }

    return Promise.all(components);
  }

  constructor (props) {
    super();
    this.state = {route: RouteStore.getRoute()};
  }

  componentWillMount () {
    this.unsubscribeList = [
      RouteStore.listen(this.handleRouteChange.bind(this))
    ];
  }

  componentWillUnmount () {
    this.unsubscribeList.map((fn) => fn());
  }

  componentDidMount () {}

  handleRouteChange () {
    console.log("handleRouteChange", RouteStore.getRoute());
    this.setState({route: RouteStore.getRoute()})
  }

  render () {
    let {Component1, Component2} = Layout.components;
    let {route} = this.state;

    return <div className={b()}>
        <h1>Приклад архітерктурного рішення для ізоморфного застосунку</h1>
        <p>
          Технологічний стек.
          <ul>
            <li>React</li>
            <li>Reflux</li>
            <li>Immutable</li>
            <li>Isomorphic fetch</li>
            <li>Gulp</li>
          </ul>

        </p>

        <p>
          <dl>
            <dt>routes =</dt>
            <dd>{route.pathStr}</dd>
          </dl>
        </p>

        {route.pathStr === "/component2"
          ? <div>
              <Component2/>
              <Link href="/">GoTo component 1</Link>
            </div>
          : <div>
              <Component1/>
              <Link href="/component2">GoTo component 2</Link>
            </div>
        }
      </div>;
  }
}

export default Layout;

