import React from "react/addons";
import BEM from "utils/BEM";

var b = BEM.b("Image");

class Image extends React.Component {
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
        <figure className = {b()}>
          <img src={this.props.src}/>
          <figcaption>{this.props.src}</figcaption>
        </figure>
    );
  }
}

export default Image;

