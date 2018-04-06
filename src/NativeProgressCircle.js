import React from "react";
import styled from "styled-components";
import ObserveSize from "react-observe-size";
import { ProgressCircle } from "./ProgressCircle";
import PropTypes from "prop-types";

const Circle = styled.svg`
  position: absolute;
  z-index: 0;
  > #backgroundCircle {
    stroke-dashoffset: 0;
    transition: all 0s ease-in-out;
    stroke: transparent;
  }
  > #prog {
    transition: all 0s ease-in-out;
    stroke-linecap: round;
    //  transform-origin: 25%;
    // transform: rotate(-90deg);
  }
`;

const ProgressText = styled.div.attrs({
  bg: props => props.backgroundColor || "transparent"
})`
  position: absolute;
  z-index: 1;
  background-color: ${props => props.bg};
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out;
`;
const ProgressValue = styled.div`
  font-size: 1em;
  font-family: sans-serif;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
`;

export class NativeProgressCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps({ size, thickness, progress, color }) {
    this.setState({
      color: color,
      radius: size / 2,
      width: size ,
      height: size ,
      strokeWidth: thickness,
      progress: this.setProgress(progress, size*0.5)
    });
  }

  setProgress(percentage, radius) {
    let progress;
    let c = Math.PI * (radius * 2);
    if (percentage < 0) {
      progress = 0;
    } else if (percentage > 100) {
      progress = 100;
    } else {
      progress = (100 - percentage) / 100 * c;
    }
    return progress;
  }

  getDashArray() {
    return this.state.radius ? (this.state.radius) * Math.PI * 2 : 0;
  }

  render() {
    console.log(this.state.radius, this.getDashArray(), this.state.progress)

    const height = this.state.height;
    const width = this.state.width;
    const cx = width ? width / 2 : 0;
    const cy = height ? height / 2 : 0;
    const r = this.state.radius
      ? (this.state.radius) - 0.5 * this.state.strokeWidth
      : 0;

    const value = Math.round(this.props.progress) + "%";
    const textStyle0 = { ...this.props.styles.textStyle };
    textStyle0.opacity = 0;
    const textStyle = this.props.displayText
      ? this.props.styles.textStyle
      : textStyle0;

    return (
      <div>
        <ObserveSize
          observerFn={layout => {
            this.setProgress(this.props.progress, this.state.radius)
            this.props.onResize(layout.width);
          }}
        >
          <ProgressText
            style={{
              lineHeight: height + "px",
              textAlign: "center",
              verticalAlign: "middle",
              width: width,
              height: height
            }}
          >
            <ProgressValue style={textStyle}>{value}</ProgressValue>
          </ProgressText>
          <Circle width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <circle
              strokeWidth={this.state.strokeWidth}
              id="backgroundCircle"
              r={this.state.radius}
              cx={cx}
              cy={cy}
              fill={this.props.displayBackground ? "#f6f6f6" : "transparent"}
              strokeDasharray={this.getDashArray()}
            />
            <circle
              id="prog"
              r={r}
              cx={cx}
              cy={cy}
              fill="transparent"
              strokeWidth={this.state.strokeWidth}
              strokeDasharray={this.getDashArray()}
              strokeDashoffset={
                this.state.progress > 0
                  ? this.state.progress
                  : this.getDashArray()
              }
              stroke={this.state.color}
            />
          </Circle>
        </ObserveSize>
      </div>
    );
  }
}

ProgressCircle.propTypes = {
  progress: PropTypes.number,
  size: PropTypes.number,
  onResize: PropTypes.func,
  thickness: PropTypes.number,
  styles: PropTypes.object,
  displayText: PropTypes.bool,
  displayBackground: PropTypes.bool,
  color: PropTypes.string
};

NativeProgressCircle.defaultProps = {
  progress: 0,
  size: 100,
  thickness: 10,
    height: 100,
    width: 100,
  displayText: true,
  displayBackground: true,
  color: "#000000"
};
