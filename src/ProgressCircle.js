import React from 'react';
import CircularProgress from '../node_modules/material-ui/CircularProgress';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ObserveSize from 'react-observe-size';

const StyledCircularProgress = styled(CircularProgress).attrs({

})`
  position: absolute !important;
  circle {
    transform-origin: 50%;
    transform: rotate(-90deg);
    transition: all 0s !important;
    }
`;


const ProgressText = styled.div.attrs({
    bg : props => props.backgroundColor || 'transparent'
})`
  background-color: ${props => props.bg};
  border-radius: 50%;
`;
const ProgressValue = styled.div`
  font-size: 1em;
  font-family: sans-serif;
`;

export const ProgressCircle = ({progress, indeterminate, size, resize, onResize, thickness, styles}) =>  {
        const prog = Math.round(progress);
        const value = progress > 0 ?  prog + '%' : '';


        return (
            <ObserveSize observerFn={layout => {
                  if(resize) onResize(layout.width)
            }}>
                <StyledCircularProgress
                    size={size}
                    thickness={thickness}
                    value={prog}
                    mode="determinate"
                />
                <ProgressText
                    backgroundColor={styles.backgroundColor}
                    style={{
                        lineHeight: size + 'px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        width: size,
                        height: size,
                    }}
                >
                    <ProgressValue
                    style={styles.textStyle}>
                       {value}
                    </ProgressValue>
                </ProgressText>
            </ObserveSize>

        );
    }


ProgressCircle.propTypes = {
    progress: PropTypes.number,
    size: PropTypes.number,
    resize: PropTypes.bool,
    onResize: PropTypes.func,
    thickness: PropTypes.number,
    styles: PropTypes.object
};
