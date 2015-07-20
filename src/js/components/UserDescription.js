import React from "react/addons";
import BEM from "utils/BEM";

var b = BEM.b("UserDescription");

class UserDescription extends React.Component {
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
      <div className={b()}>UserDescription</div>
    );
  }
}

export default UserDescription;
