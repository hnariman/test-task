import React, { useState, useEffect, useRef, ChangeEvent } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

export default function Input({
  value,
  onChange,
  placeholder,
  type,
  ...props
}: InputProps) {

  const [val, setVal] = useState('');
  const inputRef = useRef(null);
  const isControlled = value !== undefined && onChange !== undefined;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    isControlled ? onChange(e) : setVal(e.target.value);
  };

  useEffect(() => {
    if (isControlled) {
      setVal(value);
    }
  }, [value, isControlled]);

  return (
    <input
      ref={inputRef}
      type={type || 'text'}
      value={isControlled ? value : val}
      onChange={handleChange}
      placeholder={placeholder}
      {...props}
    />
  );
};

