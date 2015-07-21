import React from "react/addons";
import BEM from "utils/BEM";
import Link from "components/Link";

import Image from "components/Image";

var b = BEM.b("ImageGallery");

class ImageGallery extends React.Component {
  constructor (props) {
    super();
    this.state = {
      photos : [
          "http://lorempixel.com/g/400/200/nature/1",
          "http://lorempixel.com/g/400/200/nature/2",
          "http://lorempixel.com/g/400/200/nature/3",
          "http://lorempixel.com/g/400/200/nature/4",
          "http://lorempixel.com/g/400/200/nature/5",
          "http://lorempixel.com/g/400/200/nature/6",
          "http://lorempixel.com/g/400/200/nature/7",
          "http://lorempixel.com/g/400/200/nature/8",
          "http://lorempixel.com/g/400/200/nature/9",
          "http://lorempixel.com/g/400/200/nature/10"
      ]
    };
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
    let {photos} = this.state;
    return (
      <div className={b()}>
        <h3>Image Gallery</h3>
        <div>
          {photos.map(photo => <Image key={photo} src={photo}/>)}
        </div>
      </div>
    );
  }
}

export default ImageGallery;

