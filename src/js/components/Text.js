import React from "react/addons";
import BEM from "utils/BEM";

import {System} from "utils/helpers";

var b = BEM.b("Text");

class Text extends React.Component {
  static components = {}

  static requireComponents (route) {
    var components = [];

    components.push(
        System.attachComponent(Text, "components/UserDescription", "UserDescription")
    );


    return Promise.all(components);
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

  render () {
    let {UserDescription} = Text.components;

    return (
      <div className={b()}>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus consequuntur cum cupiditate ducimus, eius ex harum ipsa ipsam labore laudantium, maiores nisi obcaecati sint soluta unde vitae voluptatem! Fugiat, reiciendis!
        </p>

        <UserDescription/>
      </div>
    );
  }
}

export default Text;

