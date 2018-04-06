# react-circular-progress

### resizable react component to display a round progress bar

Responsive Circular Progress inspired by [Material-UI](http://www.material-ui.com/) using [react-oberserve-size](https://github.com/oberonamsterdam/react-observe-size). Tweaked original component by adding few more styling options including resizable property when placed inside a container and inner text.

Import and use `<ProgressCircle />` inside a Container which can have fixed or flexible dimensions. Use `<NativeProgressCircle />` to render the a similar Component without MUI framework [:construction_worker: work in progress]

## Sample

```javascript
import React from "react";
import { ProgressCircle } from "./ProgressCircle";

export class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progress: 42 };
  }

  render() {
    return (
      // container element determines the size of the ProgressCircle
      // (if aspect ration is not 1:1 the greater value is taken into account)
      <div style={{ width: 200, height: 200 }}>
        <ProgressCircle
          thickness={10}
          color={"#49BBD3"}
          progress={this.state.progress}
          displayText={true}
          displayBackground={true}
          size={this.state.size || 0}
          styles={{
            backgroundColor: "#F6F6F6",
            textStyle: { fontFamily: "sans-serif" }
          }}
          onResize={value => {
            this.setState({ ...this.state, ...{ size: value } });
          }}
        />
      </div>
    );
  }
}
```

## Demo

Clone the Repository and run `yarn start` to reproduce the demo shown below.

![screenshot](https://github.com/Fuasmattn/react-circular-progress/blob/master/src/screenshot.png)

## Open Tasks

* [x] Native Solution without MUI
* [ ] MUI-less Version Progress steps fix
* [x] Custom colors
* [x] resize to match container
* [ ] Start progress at 12 o'clock
* [ ] make inner text resizable
* [ ] color gradients

## License

This project is licensed under the terms of the [MIT license](https://github.com/Fuasmattn/react-circular-progress/blob/master/LICENSE)
