import React from 'react';
import CircularProgress from '../node_modules/material-ui/CircularProgress';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ObserveSize from 'react-observe-size';

import { MuiThemeProvider } from '../node_modules/material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const StyledCircularProgress = styled(CircularProgress)`
  position: absolute !important;
  circle {
    transform-origin: 50%;
    transform: rotate(-90deg);
    transition: all 0s !important;
    }
 
`;
const ProgressContainer = styled.div`

`;
const ProgressText = styled.div.attrs({
    bg : props => props.backgroundColor || '#E0E0E0'
})`
  background-color: ${props => props.bg};
  border-radius: 50%;
`;
const ProgressValue = styled.div``;
const Value = styled.div`
  font-size: 1.8em;
  font-family: sans-serif;
`;



export class ProgressCircle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: props.progress || 0,
            size: props.size || 150,
            backgroundColor: props.backgroundColor || '#E0E0E0'
    };
    }

    componentWillReceiveProps({ progress, backgroundColor, size }) {
        this.setState({
            ...this.state,
            ...{
                progress, backgroundColor, size

            },
        });
    }

    render() {
        const value = Math.round(this.state.progress);
        return (

            <ObserveSize observerFn={layout => {
                if(this.props.resize) this.setState({size: layout.width});
            }}>
            <ProgressContainer
                style={{ height: this.state.size, width: this.state.size }}
            >
                <StyledCircularProgress
                    size={this.state.size}
                    thickness={10}
                    mode="determinate"
                    value={value}
                />
                <ProgressText
                    backgroundColor={this.state.backgroundColor}
                    style={{
                        lineHeight: this.state.size + 'px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        width: this.state.size + 'px',
                        height: this.state.size + 'px',
                    }}
                >
                    <ProgressValue>
                        <Value>{value}%</Value>
                    </ProgressValue>
                </ProgressText>
            </ProgressContainer>
            </ObserveSize>

        );
    }
}

ProgressCircle.propTypes = {
    progress: PropTypes.number,
    resize: PropTypes.bool,
    size: PropTypes.number,
};
