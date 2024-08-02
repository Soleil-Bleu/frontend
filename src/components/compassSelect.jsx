import React, { useState } from 'react';
import Knob, { SkinWrap, composeTwo, useAngleUpdater } from 'react-dial-knob';
import { Compass } from 'lucide-react';

const CompassSkin = (props) => {
  const [angle, setAngle] = useAngleUpdater(props.value);
  const [isActive, setIsActive] = useState(false);
  const theme = props.theme || {};
  const activeColor = theme.activeColor || '#b56a7a';
  const defaultColor = theme.defaultColor || '#100';
  const bgrColor = isActive ? activeColor : defaultColor;
  const angleChangeHandler = composeTwo(setAngle, props.onAngleChange);
  const interactionChangeHandler = composeTwo(setIsActive, props.onInteractionChange);

  return (
    <SkinWrap style={props.style}>
      <Knob
        diameter={props.diameter}
        value={props.value}
        min={props.min}
        max={props.max}
        step={props.step}
        spaceMaxFromZero={props.spaceMaxFromZero}
        ariaLabelledBy={props.ariaLabelledBy}
        ariaValueText={props.ariaValueText}
        knobStyle={{ cursor: 'pointer', ...props.knobStyle }}
        onAngleChange={angleChangeHandler}
        onInteractionChange={interactionChangeHandler}
        onValueChange={props.onValueChange}
      >
        <svg width="120" height="120" viewBox="0 0 100 100" className="compass-container">
          {/* Compass Circle */}
          <circle cx="50" cy="50" r="48" fill="none" className="stroke-border stroke-2" />

          {/* Compass Needle */}
          <polygon points="50,10 45,50 55,50" className="fill-red-600" transform={`rotate(${props.value}, 50, 50)`} />
          <polygon points="50,90 45,50 55,50" className="fill-secondary" transform={`rotate(${props.value}, 50, 50)`} />

          {/* Cardinal Directions */}
          <text x="50" y="20" textAnchor="middle" fontSize="12" className="fill-primary select-none">N</text>
          <text x="85" y="55" textAnchor="middle" fontSize="12" className="fill-primary select-none">E</text>
          <text x="50" y="88" textAnchor="middle" fontSize="12" className="fill-primary select-none">S</text>
          <text x="15" y="55" textAnchor="middle" fontSize="12" className="fill-primary select-none">O</text>

          {/* Graduations */}
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = i * 10;
            const length = angle % 90 === 0 ? 4 : 2;
            return (
              <line
                key={i}
                x1="50"
                y1="2"
                x2="50"
                y2={2 + length}
                className="stroke-primary stroke-0.5"
                transform={`rotate(${angle}, 50, 50)`}
              />
            );
          })}

          {/* Center Circle */}
          <circle cx="50" cy="50" r="2" className="fill-primary" />
        </svg>
      </Knob>
      {props.children}
    </SkinWrap>
  );
};

const CompassSelect = ({ selectedOrientation, onSelect, errors }) => {
  const handleKnobChange = (value) => {
    const degrees = Math.round(value);
    onSelect(degrees);
  };

  return (
    <div className="relative mx-auto mt-4">
  {errors && <span className="text-red-500 absolute top-0">{errors}</span>}
  <div className="grid grid-cols-2 gap-4 items-center px-2">
    <CompassSkin
      diameter={120}
      min={0}
      max={360}
      step={1}
      value={selectedOrientation}
      onValueChange={handleKnobChange}
      theme={{
        activeColor: 'transparent',
        defaultColor: 'transparent'
      }}
      className='w-1/2'
    />
    <div className="flex items-center justify-center p-2 rounded-sm text-primary">
      <div className="flex flex-col w-full">
        <span className="font-semibold"> {/* Fixed width for cardinal direction */}
          {getCardinalDirection(selectedOrientation)}
        </span>
        <span className="font-light"> {/* Fixed width for orientation */}
          {selectedOrientation}°
        </span>
        
      </div>
    </div>
  </div>
</div>

  );
};

const getCardinalDirection = (angle) => {
  const directions = [
    { name: "Nord", range: [337.5, 360] },
    { name: "Nord", range: [0, 22.5] },
    { name: "Nord-Est", range: [22.5, 67.5] },
    { name: "Est", range: [67.5, 112.5] },
    { name: "Sud-Est", range: [112.5, 157.5] },
    { name: "Sud", range: [157.5, 202.5] },
    { name: "Sud-Ouest", range: [202.5, 247.5] },
    { name: "Ouest", range: [247.5, 292.5] },
    { name: "Nord-Ouest", range: [292.5, 337.5] }
  ];

  for (const direction of directions) {
    if (angle >= direction.range[0] && angle <= direction.range[1]) {
      return direction.name;
    }
  }
  return "Nord"; // Fallback to North if no direction matches
};

export default CompassSelect;
