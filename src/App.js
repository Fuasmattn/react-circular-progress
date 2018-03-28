import React, { Component } from 'react';
import {ProgressCircle} from './ProgressCircle';
import { MuiThemeProvider } from '../node_modules/material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';

import { Resizable, ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';


const Container = styled(Paper)`
  padding:28px;
  height: 100%;
  width: 100%;
`;
const Sample = styled.div`
   width: 50%;
   margin: 0 auto;
   padding-top: 100px;
`;
const muiTheme = getMuiTheme({
 // add custom theme
    palette: {
        primary1Color: '#20e369'
    }
});

class App extends Component {
  render() {
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div className="App">
            <Sample>
              <ResizableBox
                  lockAspectRatio={true}
                  width={200} height={200} minConstraints={[150, 150]} maxConstraints={[500, 500]}>
                <Container>
                    <ProgressCircle
                        backgroundColor={'#f6f6f6'}
                        resize={true}
                        size={150}
                        progress={42}/>
                </Container>
              </ResizableBox>
            </Sample>
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
