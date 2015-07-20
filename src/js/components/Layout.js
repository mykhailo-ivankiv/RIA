import React from "react/addons";
import BEM from "utils/BEM";
import {System} from "utils/helpers";

import Link from "components/Link";

import RouteActions from "actions/RouteActions";
import RouteStore from "stores/RouteStore";
var b = BEM.b("Layout");

class Layout extends React.Component {
  static components = {}
  static requireComponents (route) {
    var components = [];

    if (route === "/text" || route.pathStr === "/text") {

      components.push(
          System.attachComponent(Layout, "components/Text", "Text")
      )
    } else {
      components.push(
          System.attachComponent(Layout, "components/ImageGallery", "ImageGallery")
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
    console.log("handleRouteChange", RouteStore.getRoute());
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
          <Link className = {b("link", {active: route.pathStr === "/"})} href="/">Images</Link>
          <Link className = {b("link", {active: route.pathStr === "/text"})} href="/text">Text</Link>
        </div>

        <div>
          {route.pathStr === "/text"
              ? <Text/>
              : <ImageGallery/>
          }
        </div>
      </div>;
  }
}

export default Layout;

