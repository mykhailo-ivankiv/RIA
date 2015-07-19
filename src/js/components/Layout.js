import React from "react/addons";
import BEM from "utils/BEM";

var b = BEM.b("Layout");

class Layout extends React.Component {
  static requireComponents () {
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

  render () {
    return (
      <div className={b()}>Root component</div>
    );
  }
}

export default Layout;

