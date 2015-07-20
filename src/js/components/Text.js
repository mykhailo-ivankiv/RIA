import React from "react/addons";
import BEM from "utils/BEM";
import RouteStore from "stores/RouteStore";

import {System} from "utils/helpers";

var b = BEM.b("Text");

class Text extends React.Component {
  static components = {}

  static requireComponents (route) {

    var components = [];
    if (route.paths[1]) {
      components.push(
          System.attachComponent(Text, "components/UserDescription", "UserDescription", route)
      );
    }


    return Promise.all(components);
  }


  constructor (props) {
    super();
    this.state = {
      route: RouteStore.getRoute(),
      content : [
          `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus consequuntur cum cupiditate ducimus, eius ex harum ipsa ipsam labore laudantium, maiores nisi obcaecati sint soluta unde vitae voluptatem! Fugiat, reiciendis!`
      ]
    };
  }

  handleRouteChange() {
    this.setState({route: RouteStore.getRoute()})
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

  render () {
    let {UserDescription} = Text.components;
    let {content, route} = this.state;
    return (
      <div className={b()}>
        <p>{content[0]}</p>
        {route.paths[1]
            ? <UserDescription/>
            : "No users detected"
        }

      </div>
    );
  }
}

export default Text;

