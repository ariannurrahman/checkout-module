import { useState } from 'react';

import './style.scss';

const Input = ({
  errors,
  fieldName,
  isRequired,
  label,
  maxLength,
  minLength,
  register,
  type = 'text',
  isDisabled = false,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleOnFocus = () => {
    setIsFocus(true);
  };

  const handleOnBlur = () => {
    setIsFocus(false);
  };

  const RenderInput = () => {
    switch (type) {
      case 'text':
        return (
          <input
            disabled={isDisabled}
            type={type}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            className="text-input"
            {...register(fieldName, {
              required: {
                value: isRequired,
                message: `${label} is required`,
              },
              maxLength: {
                value: maxLength,
                message: `Value must be maximum ${maxLength}`,
              },
              minLength: {
                value: minLength,
                message: `Value must be minimum ${minLength}`,
              },
            })}
          />
        );
      case 'text-area':
        return (
          <textarea
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            className="text-input-area"
            {...register(fieldName, {
              required: {
                value: isRequired,
                message: `${label} is required`,
              },
              maxLength: {
                value: maxLength,
                message: `Value must be maximum ${maxLength}`,
              },
              minLength: {
                value: minLength,
                message: `Value must be minimum ${minLength}`,
              },
            })}
          />
        );

      case 'checkbox':
        return (
          <input
            className="checkbox-input"
            {...register(fieldName, {
              required: {
                value: isRequired,
                message: `${label} is required`,
              },
              maxLength: {
                value: maxLength,
                message: `Value must be maximum ${maxLength}`,
              },
              minLength: {
                value: minLength,
                message: `Value must be minimum ${minLength}`,
              },
            })}
          />
        );
      default:
        break;
    }
  };

  return (
    <div className="input-wrapper">
      <label className={`${isFocus ? 'active' : ''}`}>{label}</label>
      <RenderInput />

      <p className="error-message">
        {errors[fieldName] && errors[fieldName].message}
      </p>
    </div>
  );
};

export { Input };
