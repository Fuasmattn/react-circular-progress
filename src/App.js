import React, { Component } from 'react';
import {ProgressCircle} from './ProgressCircle';
import { MuiThemeProvider } from '../node_modules/material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import 'react-resizable/css/styles.css';
import {Container} from "./Container";
import {Settings} from "./Settings";
import AppBar from 'material-ui/AppBar';
import {cyan500, amber500, blueGrey500} from 'material-ui/styles/colors';


const muiTheme = getMuiTheme({
    // modify muiTheme to set progress color
    palette: {
        primary1Color: amber500,
    },
    appBar: {
        height: 64,
        color: blueGrey500
    }


});






class App extends Component {
    constructor(props){
        super(props);

        this.state=({
            thickness: 10,
            backgroundColor: '#f6f6f6',
            textStyle: {fontFamily: 'sans-serif', fontSize: '1.8em'},
            progress: 42,
            size: 150,
            resize: true,
            indeterminate: false,

    });
    }

    handleChange(e,v){
        switch(e.target.name){
            case 'indeterminate':
                this.setState({...this.state,...{indeterminate: v}});
                break;
            case 'resize':
                this.setState({...this.state,...{resize: v}});
                break;
            default:
                if(!this.state.indeterminate) this.setState({...this.state,...{progress: v}});
                break;

        }
    }

  render() {
        const {backgroundColor, thickness, indeterminate, textStyle, progress, resize, size} = this.state;
        const progressCircle =
            <ProgressCircle
              styles={{backgroundColor: backgroundColor, textStyle: textStyle}}
              resize={resize}
              thickness={thickness}
              progress={progress}
              size={size}
              indeterminate={indeterminate}
              onResize={value => {this.setState({...this.state,...{size: value}})}}
            />

    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <AppBar title="mp-progress-circle">

            <Settings
            progress={this.state.progress}
            handleChange={(e,v) => {this.handleChange(e,v)}}
            />

            </AppBar>


            <Container progress={progressCircle}/>

        </MuiThemeProvider>
    );
  }
}

export default App;
