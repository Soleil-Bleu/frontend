import React from 'react';

export const TextInput = ({ label, name, value, onChange, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      className="form-input mt-1 block w-full"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export const NumberInput = ({ label, name, value, onChange, step = 1, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      name={name}
      type="number"
      value={value}
      onChange={onChange}
      step={step}
      className="form-input mt-1 block w-full"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export const CheckboxInput = ({ label, name, checked, onChange, error }) => (
  <div className="flex items-start">
    <div className="flex items-center h-5">
      <input
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox mt-1"
      />
    </div>
    <div className="ml-3 text-sm">
      <label htmlFor={name} className="font-medium text-gray-700">{label}</label>
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export const FileInput = ({ label, name, onChange, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      name={name}
      type="file"
      onChange={onChange}
      className="form-input mt-1 block w-full"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
