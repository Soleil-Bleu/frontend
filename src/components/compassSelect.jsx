import React from 'react';
import { ArrowUp, ArrowUpRight, ArrowRight, ArrowDownRight, ArrowDown, ArrowDownLeft, ArrowLeft, ArrowUpLeft, Compass } from 'lucide-react';
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

const orientations = [
  { value: 0, icon: ArrowUp, label: 'Nord', position: 'row-start-1 col-start-2' },
  { value: 45, icon: ArrowUpRight, label: 'Nord-Est', position: 'row-start-1 col-start-3' },
  { value: 90, icon: ArrowRight, label: 'Est', position: 'row-start-2 col-start-3' },
  { value: 135, icon: ArrowDownRight, label: 'Sud-Est', position: 'row-start-3 col-start-3' },
  { value: 180, icon: ArrowDown, label: 'Sud', position: 'row-start-3 col-start-2' },
  { value: 225, icon: ArrowDownLeft, label: 'Sud-Ouest', position: 'row-start-3 col-start-1' },
  { value: 270, icon: ArrowLeft, label: 'Ouest', position: 'row-start-2 col-start-1' },
  { value: 315, icon: ArrowUpLeft, label: 'Nord-Ouest', position: 'row-start-1 col-start-1' },
];

const CompassSelect = ({ selectedOrientation, onSelect, errors }) => {
  return (
    <div className="relative mx-auto mt-4">
      {errors && <span className="text-red-500 absolute top-0">{errors}</span>}
      <ToggleGroup type="single" className="grid grid-cols-3 grid-rows-3 gap-2">
        {orientations.map(({ value, icon: Icon, label, position }) => (
          <ToggleGroupItem
            key={value}
            value={value}
            aria-label={`Toggle ${label}`}
            onClick={() => onSelect(value)}
            className={`flex justify-center items-center p-2 border rounded ${selectedOrientation === value ? '' : 'bg-gray-200 text-gray-700'} ${position}`}
          >
            <Icon className="h-6 w-6" />
          </ToggleGroupItem>
        ))}
        <div className="flex justify-center items-center p-2 col-start-2 row-start-2 pointer-events-none">
          <div className="flex items-center justify-center h-6 w-6">
            {selectedOrientation !== '' ? (
              <span className="text-xl font-semibold">{selectedOrientation}°</span>
            ) : (
              <Compass className="h-6 w-6 text-gray-500 rotate-[-45deg]" />
            )}
          </div>
        </div>
      </ToggleGroup>
    </div>
  );
};

export default CompassSelect;
