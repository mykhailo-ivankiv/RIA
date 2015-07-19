import React from "react/addons";
import BEM from "utils/BEM";

var b = BEM.b("Component2");

class Component2 extends React.Component {
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
      <div className={b()}>Component2</div>
    );
  }
}

export default Component2;

