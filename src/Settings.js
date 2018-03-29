import React from 'react';
import Slider from 'material-ui/Slider';
import Toggle from 'material-ui/Toggle';
const styles = {
    toggle: {
            marginBottom: 16,
            width: 'auto',

    },
    label: {
        color: 'white'
    }
}

export const Settings = ({progress, handleChange}) => {
    return(
        <div style={{width: '50%', margin: '0 auto', padding: '64px 128px 0 0 ', float : 'left'}}>
            <Toggle
                name="resize"
                label="Resize"
                style={styles.toggle}
                labelStyle={styles.label}
                onToggle={handleChange}
            />
            <Toggle
                name="indeterminate"
                label="Indeterminate"
                style={styles.toggle}
                labelStyle={styles.label}
                onToggle={handleChange}
            />
        <div style={{width: '100%', margin: '0 auto', padding: '0 128px 0 0 ', float : 'left'}}>

            <Slider
                name="progress"
                min={0}
                max={100}
                step={1}
                value={progress}
                onChange={handleChange}
            />

        </div>
        </div>
    )
}