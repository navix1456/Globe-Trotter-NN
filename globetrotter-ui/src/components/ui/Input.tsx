import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="form-field">
        {label && (
          <label className="form-label">
            {label}
            {props.required && <span className="required">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`form-input ${error ? 'error' : ''} ${className}`}
          {...props}
        />
        {error && <span className="form-error">{error}</span>}
        {helperText && !error && <span className="form-helper">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
