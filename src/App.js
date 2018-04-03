import React, { Component } from "react";
import { ProgressCircle } from "./ProgressCircle";
import { MuiThemeProvider } from "../node_modules/material-ui/styles";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import "react-resizable/css/styles.css";
import { Container } from "./Container";
import { Settings } from "./Settings";
import { blueGrey500 } from "material-ui/styles/colors";

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

  updateMuiTheme(color) {
    return getMuiTheme({
      typography: {
        fontFamily: "Roboto",
        fontSize: "5rem"
      },

      palette: {
        primary1Color: color,
        secondary: "#505050"
      },
      appBar: {
        height: 56,
        color: blueGrey500
      }
    });
  }
  onSliderMoved(e, v) {
    if (!this.state.indeterminate)
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
    const progressCircle = (
      <ProgressCircle
        styles={{ backgroundColor: backgroundColor, textStyle: textStyle }}
        thickness={thickness}
        progress={progress}
        size={size}
        displayText={displayText}
        displayBackground={displayBackground}
        onResize={value => {
          this.setState({ ...this.state, ...{ size: value } });
        }}
      />
    );

    return (
      <MuiThemeProvider muiTheme={this.updateMuiTheme(this.state.color)}>
        <Headline>mp-circular-progress</Headline>
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
          handleChange={(e, v) => {
            this.handleChange(e, v);
          }}
        />

        <Container progress={progressCircle} />
      </MuiThemeProvider>
    );
  }
}
