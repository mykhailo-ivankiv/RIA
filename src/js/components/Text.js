import React from "react/addons";
import BEM from "utils/BEM";

import RouteStore from "stores/RouteStore";
import ArticleStore from "stores/ArticleStore";

import fetch from "isomorphic-fetch";

import {System} from "utils/helpers";

var b = BEM.b("Text");

class Text extends React.Component {
  static components = {}

  static requireComponents (route, cacheObj) {
    return ArticleStore
        .getArticle(route.paths[1] ? 2 : 1, true)
        .then(data => {
          return data.author
              ? System.attachComponent(Text, "components/UserDescription", "UserDescription", route, cacheObj)
                .then(() => data)
              : data
        });
  }

  constructor (props) {
    super();
    var route = RouteStore.getRoute();

    this.state = {
      route,
      content : ArticleStore.getArticle(route.paths[1] ? 2 : 1).content,
      user: ArticleStore.getArticle(route.paths[1] ? 2 : 1).author
    };
  }

  handleRouteChange() {
    var route = RouteStore.getRoute();

    this.setState({
      route,
      content : ArticleStore.getArticle(route.paths[1] ? 2 : 1).content,
      user: ArticleStore.getArticle(route.paths[1] ? 2 : 1).author
    })
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
    let {user, content, route} = this.state;
    return (
      <div className={b()}>
        <p>{content}</p>
        {user
            ? <UserDescription/>
            : "No users detected"
        }

      </div>
    );
  }
}

export default Text;

