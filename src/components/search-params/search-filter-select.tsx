import { ReactNode } from "react";
import { Combobox } from "../combobox";

type Props = {
  placeholder?: string;
  defaultValue?: string;
  options: {
    value: string;
    label: ReactNode;
  }[];
  className?: string;
  onChange: (value: string) => void;
};

export function SearchFilterSelect({
  placeholder = "Select...",
  defaultValue,
  options,
  className,
  onChange,
}: Props) {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <Combobox
      className={className}
      placeholder={placeholder}
      defaultValue={defaultValue}
      options={options}
      onSelect={handleChange}
    />
  );
}
