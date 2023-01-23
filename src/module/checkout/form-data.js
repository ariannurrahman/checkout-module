const FORM_DATA = [
  {
    label: 'Email',
    fieldName: 'email',
    required: { value: true, message: 'Email is required' },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Enter valid email',
    },
    placeholder: 'Email',
    type: 'text',
  },
  {
    label: 'Dropshipper Name',
    fieldName: 'dropshipperName',
    required: { value: true, message: 'Dropshipper name is required' },
    placeholder: 'Dropshipper Name',
    type: 'text',
  },
  {
    label: 'Phone Number',
    fieldName: 'phoneNumber',
    required: { value: true, message: 'Phone number is required' },
    minLength: { value: 6, message: 'Min 6 digits' },
    maxLength: { value: 20, message: 'Max 20 digits' },
    placeholder: 'Phone Number',
    type: 'number',
  },
  {
    label: 'Dropshipper Phone Number',
    fieldName: 'dropshipperPhoneNumber',
    required: { value: true, message: 'Dropshipper phone number is required' },
    minLength: { value: 6, message: 'Invalid phone number' },
    maxLength: { value: 20, message: 'Invalid phone number' },
    placeholder: 'Dropshipper Phone Number',
    type: 'number',
  },
  {
    label: 'Delivery Address',
    fieldName: 'deliveryAddress',
    required: { value: true, message: 'Delivery address is required' },
    maxLength: { value: 120, message: 'Address limit 120 chars' },
    placeholder: 'Delivery Address',
    type: 'textarea',
  },
];

export { FORM_DATA };
