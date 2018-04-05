import React from "react";
import "react-resizable/css/styles.css";
import { Container } from "./Container";
import { Settings } from "./Settings";
import { NativeProgressCircle } from "./NativeProgressCircle";

import styled from "styled-components";

const Headline = styled.h1`
  font-family: "Roboto Slab", sans-serif;
  width: 50%;
  margin: 0 auto;
  margin-top: 50px;
  color: #505050;
`;

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thickness: 10,
      backgroundColor: "#f6f6f6",
      textStyle: { fontSize: "1.8em" },
      progress: 42,
      size: 150,
      displayText: true,
      displayBackground: true,
      resize: true,
      indeterminate: false,
      color: "#f44336"
    };
  }

  onSliderMoved(e, v) {
    if (!this.state.indeterminate )
      this.setState({ ...this.state, ...{ progress: v } });
  }

  render() {
    const {
      backgroundColor,
      thickness,
      textStyle,
      progress,
      displayBackground,
      displayText,
      size
    } = this.state;

    return (
      <div>
        <Headline>react-circular-progress</Headline>

        <Settings
          progress={this.state.progress}
          color={this.state.color}
          toggleText={() => {
            this.setState({ displayText: !this.state.displayText });
          }}
          toggleBackground={() => {
            this.setState({ displayBackground: !this.state.displayBackground });
          }}
          onColorChanged={color => {
            this.setState({ color: color.hex });
          }}
          onSliderMoved={(e, v) => {
            this.onSliderMoved(e, v);
          }}
        />

        <Container
          progress={
            <NativeProgressCircle
              thickness={thickness}
              color={this.state.color}
              progress={progress}
              displayText={displayText}
              displayBackground={displayBackground}
              styles={{
                backgroundColor: backgroundColor,
                textStyle: textStyle
              }}
              size={size}
              onResize={value => {
                this.setState({ ...this.state, ...{ size: value } });
              }}
            />
          }
        />
      </div>
    );
  }
}
