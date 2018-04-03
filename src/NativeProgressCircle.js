import React from "react";
import styled from "styled-components";
import ObserveSize from "react-observe-size";

const Circle = styled.svg`
  position: absolute;
  z-index: 0;
  > #backgroundCircle {
    stroke-dashoffset: 0;
    transition: all 0s ease-in-out;
    stroke: transparent;
  }
  > #prog {
    transition: all 0s  ease-in-out;
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
      width: size + thickness,
      height: size + thickness,
      strokeWidth: thickness
    });
    this.setProgress(progress);
  }

  setProgress(percentage) {
    let progress;
    let c = Math.PI * (this.state.radius * 2);
    if (percentage === 0) {
      progress = 0;
    } else {
      progress = (100 - percentage) / 100 * c;
    }

    this.setState({ progress: progress });
  }

  getDashArray() {
    return this.state.radius * Math.PI * 2;
  }

  render() {
    const prog = Math.round(this.props.progress);
    const value = this.props.progress > 0 ? prog + "%" : "";
    const textStyle0 = { ...this.props.styles.textStyle };
    textStyle0.opacity = 0;
    const textStyle = this.props.displayText
      ? this.props.styles.textStyle
      : textStyle0;
    return <div>
        <ObserveSize observerFn={layout => {
            this.props.onResize(layout.width);
          }}>
          <ProgressText style={{ lineHeight: this.state.height + "px", textAlign: "center", verticalAlign: "middle", width: this.state.width, height: this.state.height }}>
            <ProgressValue style={textStyle}>{value}</ProgressValue>
          </ProgressText>
          <Circle width={this.state.width} height={this.state.height}>
            <circle strokeWidth={this.state.strokeWidth} id="backgroundCircle" r={this.state.radius} cx={this.state.width / 2} cy={this.state.height / 2} fill={this.props.displayBackground ? "#f6f6f6" : "transparent"} strokeDasharray={this.getDashArray()} />
            <circle id="prog" r={this.state.radius - 0.5 * this.state.strokeWidth} cx={this.state.width / 2} cy={this.state.height / 2} fill="transparent" strokeWidth={this.state.strokeWidth} strokeDasharray={this.getDashArray()} strokeDashoffset={this.state.progress} stroke={this.state.color} />
          </Circle>
        </ObserveSize>
      </div>;
  }
}

NativeProgressCircle.defaultProps = {
  width: 100,
  height: 100,
  radius: 50,
  strokeWidth: 5
};
