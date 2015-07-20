import React from "react/addons";
import BEM from "utils/BEM";
import {System} from "utils/helpers";

import Link from "components/Link";

import RouteActions from "actions/RouteActions";
import RouteStore from "stores/RouteStore";
var b = BEM.b("Layout");

class Layout extends React.Component {
  static components = {}
  static requireComponents (route) { //TODO: maybe preRequired will be better name
    var components = [];

    console.log(route);

    if (route.paths[0] === "text") {
      components.push(
          System.attachComponent(Layout, "components/Text", "Text", route)
      )
    } else {
      components.push(
          System.attachComponent(Layout, "components/ImageGallery", "ImageGallery", route)
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
    this.setState({route: RouteStore.getRoute()})
  }

  render () {
    let {ImageGallery, Text} = Layout.components;
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
          Цей шаблон являється спробою вирішити наступні технічні проблеми.
          <ol>
            <li>Ліниве підвантаження модулів. В залежності від URL маршруту</li>
            <li>
              Поєднання асинхронного підвантаження даних із синхронним рендером React відображення.
              (Складність полягає в ізоморфній архітерктурі.)
            </li>
          </ol>
        </p>

        <p>
          <dl>
            <dt>routes =</dt>
            <dd>{route.pathStr}</dd>
          </dl>
        </p>

        <div>
          <Link
              href="/"
              className = {b("link", {active: route.pathStr === "/"})}
              >Images</Link>
          <Link
              href="/text"
              className = {b("link", {active: route.paths[0] === "text" && !route.paths[1] })}
              >Text</Link>
          <Link
              href="/text/1"
              className = {b("link", {active: route.paths[0] === "text" && route.paths[1] })}
              >Text + User</Link>
        </div>

        <div>
          {route.paths[0] === "text"
              ? <Text/>
              : <ImageGallery/>
          }
        </div>
      </div>;
  }
}

export default Layout;

