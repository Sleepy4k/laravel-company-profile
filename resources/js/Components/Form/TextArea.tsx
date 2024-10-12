import { ComponentProps } from 'react';

interface TextAreaProps extends ComponentProps<'textarea'> {
  error?: string;
}

export default function TextArea({
  name,
  className,
  error,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      id={name}
      name={name}
      {...props}
      className={`form-textarea w-full focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 border-gray-300 rounded ${
        error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
      } ${className}`}
    />
  );
}
