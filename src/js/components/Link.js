import React from "react/addons";
import RouteAction from "actions/RouteActions";
import Immutable from "immutable";

class IsomorphicLink extends React.Component {
  static defaultProps = {scrollToTop: true };


  handleNavigation (ev) {
    switch (ev.button) {
      case 0: //'Left Mouse button pressed.'
        if (this.props.onClick) { this.props.onClick(ev); }
        if (this.props.scrollToTop) { window.scrollTo(0, 0); }

        RouteAction.goTo(ev.currentTarget.getAttribute("href"));
        ev.preventDefault();

        break;
      case 1: //'Middle Mouse button pressed.'
      case 2: //Right Mouse button pressed.
      default:
    }
  }

  render () {
    var transferredProps = Immutable.fromJS(this.props).toJS();
    delete transferredProps.onClick;
    return <a onClick={this.handleNavigation.bind(this)} {... transferredProps}>{this.props.children}</a>
  }
}

export default IsomorphicLink;