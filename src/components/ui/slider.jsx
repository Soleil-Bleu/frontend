import React, { Fragment, useEffect, useState, forwardRef } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from "@/lib/utils";

const Slider = forwardRef((props, ref) => {
  const {
    className,
    min,
    max,
    step,
    formatLabel,
    value = [min, max],
    onValueChange,
    ...rest
  } = props;
  
  const [localValues, setLocalValues] = useState(value);
  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    if (value) {
      setLocalValues(value);
    }
  }, [value]);

  const handleValueChange = (newValues) => {
    const newValueTuple = [newValues[0], newValues[newValues.length - 1]];
    setLocalValues(newValueTuple);
    onValueChange?.(newValueTuple);
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      min={min}
      max={max}
      step={step}
      value={localValues}
      onValueChange={handleValueChange}
      className={cn('relative flex w-full touch-none select-none mb-6 items-center', className)}
      {...rest}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {localValues.map((value, index) => (
        <Fragment key={index}>
          <SliderPrimitive.Thumb
            className={`block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${isGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
            onPointerDown={() => setIsGrabbing(true)}
            onPointerUp={() => setIsGrabbing(false)}
            onPointerLeave={() => setIsGrabbing(false)}
          >
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 rounded-md border bg-popover text-popover-foreground shadow-sm px-2 whitespace-nowrap">
              {formatLabel ? formatLabel(value) : value}
            </div>
          </SliderPrimitive.Thumb>
        </Fragment>
      ))}
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
