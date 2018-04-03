import React from "react";
import Slider from "material-ui/Slider";
import { CirclePicker } from "react-color";
import Toggle from "material-ui/Toggle";

export const Settings = ({
  progress,
  onSliderMoved,
  onColorChanged,
  color,
  toggleText,
  toggleBackground
}) => {
  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto"
      }}
    >
      <Slider
        name="progress"
        min={0}
        max={100}
        step={1}
        value={progress}
        onChange={onSliderMoved}
      />
      <div>
        <div style={{ display: "inline-block" }}>
          <CirclePicker color={color} onChangeComplete={onColorChanged} />
        </div>
        <div style={{ display: "inline-block", padding: "0 50px" }}>
          <Toggle
            label="Show Text"
            onToggle={toggleText}
            defaultToggled={true}
          />
          <Toggle
            label="Background"
            onToggle={toggleBackground}
            defaultToggled={true}
          />
        </div>
      </div>
    </div>
  );
};
