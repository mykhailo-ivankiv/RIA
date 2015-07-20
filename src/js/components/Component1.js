import React from "react/addons";
import BEM from "utils/BEM";
import Link from "components/Link";

var b = BEM.b("Component1");

class Component1 extends React.Component {
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
    return (
      <div className={b()}>Component1</div>
    );
  }
}

export default Component1;

