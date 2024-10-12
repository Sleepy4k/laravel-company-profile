import Select from 'react-select';
import { ComponentProps } from 'react';

interface SelectInputProps {
  name: string;
  error?: string;
  onChange?: any;
  defaultValue?: { value: any; label: any };
  options: { value: string; label: string }[];
}

export default function SelectInput({
  name,
  error,
  onChange,
  defaultValue,
  options = [],
}: SelectInputProps) {
  return (
    <Select
      id={name}
      name={name}
      onChange={onChange}
      defaultValue={defaultValue}
      options={options}
      isClearable={true}
      isSearchable={true}
      className={`w-full focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 border-gray-300 rounded ${
        error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
      }`}
    />
  );
}
