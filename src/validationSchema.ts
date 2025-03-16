import * as yup from 'yup';
import { emailPattern } from './validationRules.ts';

const defaultSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
    .required('This field is required'),
  email: yup
    .string()
    .email('Invalid Email Address')
    .required('This field is required')
    .test('is-empty-or-match', 'Invalid Email Address', function (value) {
      return value === '' || emailPattern.value.test(value);
    }),
  age: yup
    .number()
    .typeError('Age must be a number')
    .positive('Age cannot be negative')
    .integer('Age must be an integer')
    .required('This field is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
    )
    .required('This field is required'),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('This field is required'),
  gender: yup
    .string()
    .required('This field is required')
    .oneOf(['Male', 'Female', ''], 'Invalid gender')
    .required('This field is required'),
  country: yup.string().required('This field is required'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms')
    .required('This field is required'),
  image: yup
    .mixed<File>()
    .test('type', 'Only PNG and JPEG are allowed', (value) => {
      if (!value) return false;
      return ['image/png', 'image/jpeg'].includes(value.type);
    })
    .test('size', 'File size must be less than 2MB', (value) => {
      if (!value) return false;
      return value.size <= 2 * 1024 * 1024;
    })
    .required('This field is required'),
});

export default defaultSchema;
