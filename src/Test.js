import React from 'react';
import {ProgressCircle} from "./ProgressCircle";

export class Test extends React.Component{
    constructor(props){
        super(props);
        this.state=({progress: 42})
    }

    render(){
        return(
            // container element determines the size of the ProgressCircle
            // (if aspect ration is not 1:1 the greater value is taken into account)
            <div style={{width: 200, height: 200}}>
                <ProgressCircle
                    thickness={10}
                    color={'#49BBD3'}
                    progress={this.state.progress}
                    displayText={true}
                    displayBackground={true}
                    size={this.state.size || 0}
                    styles={{
                        backgroundColor: '#F6F6F6',
                        textStyle: {fontFamily: 'sans-serif'}
                    }}
                    onResize={value => {
                        this.setState({...this.state, ...{size: value}});
                    }}
                />
            </div>
        )
    }
}