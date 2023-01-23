import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useCheckoutStore } from 'store';
import { FORM_DATA } from 'module/checkout/form-data';
import { Title } from 'components';
import './style.scss';

const Delivery = ({ onChangeActiveSection }) => {
  const formOnLocalStorage = JSON.parse(
    localStorage.getItem('jakmal-checkout')
  );

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: formOnLocalStorage?.state?.form,
  });

  const setForm = useCheckoutStore((state) => state.setForm);
  const dropshipFee = useCheckoutStore((state) => state.dropshipFee);

  const [isDropship, setIsDropship] = useState(
    formOnLocalStorage?.state?.form?.isDropship || false
  );
  const [focusedForm, setFocusedForm] = useState({
    fieldName: { isFocus: false },
  });

  // handle clear dropship when not send as dropshipper
  useEffect(() => {
    if (!isDropship) {
      reset({ dropshipperPhoneNumber: '', dropshipperName: '' });
      dropshipFee(false);
    } else {
      dropshipFee(true);
    }
  }, [isDropship, reset, dropshipFee]);

  const handleOnFocus = (fieldName) => {
    setFocusedForm((prevState) => ({
      ...prevState,
      [fieldName]: { isFocus: true },
    }));
  };

  const handleOnBlur = (fieldName) => {
    setFocusedForm((prevState) => ({
      ...prevState,
      [fieldName]: { isFocus: false },
    }));
  };

  const onCheckDropship = () => {
    setIsDropship((prevState) => !prevState);
  };

  const onSubmit = (data) => {
    onChangeActiveSection(2);
    if (data.isDropship) {
      dropshipFee(true);
    }
    setForm(data);
  };

  const modifiedFormData = FORM_DATA.map((form) => {
    const checkFieldName =
      form.fieldName === 'dropshipperName' ||
      form.fieldName === 'dropshipperPhoneNumber';

    return {
      ...form,
      required: {
        value: !checkFieldName
          ? true
          : checkFieldName && isDropship
          ? true
          : false,
        message: `${form.label} is required`,
      },
    };
  });

  return (
    <form
      id="delivery-form"
      onSubmit={handleSubmit(onSubmit)}
      className="delivery-container">
      <div>
        <div className="title-wrapper">
          <Title>Delivery details</Title>
          <div className="checkbox-wrapper">
            <input
              className="checkbox"
              id="dropshipCheck"
              {...register('isDropship', { required: false })}
              type="checkbox"
              onChange={onCheckDropship}
            />
            <label htmlFor="dropshipCheck">Send as dropshipper</label>
          </div>
        </div>
        <div className="form">
          {modifiedFormData.map(
            ({
              maxLength,
              minLength,
              fieldName,
              label,
              pattern,
              required,
              type,
              valueAsNumber = false,
            }) => {
              return (
                <div key={fieldName} className="form-wrapper">
                  <label
                    htmlFor={fieldName}
                    className={`${
                      focusedForm[fieldName]?.isFocus || getValues(fieldName)
                        ? 'active'
                        : ''
                    }`}>
                    {label}
                  </label>
                  {errors[fieldName] && (
                    <img
                      src="/img/cross.svg"
                      className="cross-check-icon"
                      alt="cross"
                    />
                  )}
                  {!errors[fieldName] && getValues(fieldName) && (
                    <img
                      src="/img/check.svg"
                      className="cross-check-icon"
                      alt="check"
                    />
                  )}

                  {type === 'textarea' ? (
                    <textarea
                      disabled={
                        (fieldName === 'dropshipperName' ||
                          fieldName === 'dropshipperPhoneNumber') &&
                        !isDropship
                      }
                      id={fieldName}
                      onFocus={() => handleOnFocus(fieldName)}
                      onBlur={() => handleOnBlur(fieldName)}
                      className={`${
                        errors[fieldName] && 'input-error'
                      } input-area ${
                        !errors[fieldName] &&
                        getValues(fieldName) &&
                        'input-success'
                      }  
                    input-form`}
                      type={type}
                      {...register(fieldName, {
                        required: {
                          value: required?.value,
                          message: required?.message,
                        },
                        pattern: {
                          value: pattern?.value,
                          message: pattern?.message,
                        },
                        minLength: {
                          value: minLength?.value,
                          message: minLength?.message,
                        },
                        maxLength: {
                          value: maxLength?.value,
                          message: maxLength?.message,
                        },
                        valueAsNumber: valueAsNumber,
                      })}
                    />
                  ) : (
                    <input
                      disabled={
                        (fieldName === 'dropshipperName' ||
                          fieldName === 'dropshipperPhoneNumber') &&
                        !isDropship
                      }
                      id={fieldName}
                      onFocus={() => handleOnFocus(fieldName)}
                      onBlur={() => handleOnBlur(fieldName)}
                      className={`${errors[fieldName] && 'input-error'} ${
                        !errors[fieldName] &&
                        getValues(fieldName) &&
                        'input-success'
                      }  
                    input-form`}
                      type={type}
                      {...register(fieldName, {
                        required: {
                          value: required?.value,
                          message: required?.message,
                        },
                        pattern: {
                          value: pattern?.value,
                          message: pattern?.message,
                        },
                        minLength: {
                          value: minLength?.value,
                          message: minLength?.message,
                        },
                        maxLength: {
                          value: maxLength?.value,
                          message: maxLength?.message,
                        },
                        valueAsNumber: valueAsNumber,
                      })}
                    />
                  )}

                  <p className="error-message">
                    {errors[fieldName] && errors[fieldName].message}
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </form>
  );
};

export { Delivery };
