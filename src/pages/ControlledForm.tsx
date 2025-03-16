import { Controller, useForm } from 'react-hook-form';
import { IForm } from '../types.ts';
import { FormEvent } from 'react';
import ValidationError from '../components/ValidationError';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/slices/formsSlice.ts';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailPattern } from '../validationRules.ts';
import Autocomplete from '../components/Autocomplete';
import { RootState } from '../store/store.ts';

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
const ControlledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.countries.items);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver<IForm>(defaultSchema),
  });

  const fileToBase64 = async (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(
      async (data) => {
        const file64 = await fileToBase64(data.image);
        dispatch(addItem({ ...data, image: file64 as string }));
        navigate('/');
      },
      (errors) => {
        console.log(errors);
      }
    )();
  };

  return (
    <div className="wrapper">
      <h2>Controlled Form</h2>
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Controller
            name="name"
            defaultValue=""
            control={control}
            render={({ field: { ...field } }) => (
              <input {...field} className="input" />
            )}
          />
          <ValidationError error={errors.name} />
        </div>
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <Controller
            name="age"
            control={control}
            render={({ field: { ...field } }) => (
              <input {...field} className="input" />
            )}
          />
          <ValidationError error={errors.age} />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field: { ...field } }) => (
              <input {...field} className="input" />
            )}
          />
          <ValidationError error={errors.email} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ field: { ...field } }) => (
              <input {...field} className="input" />
            )}
          />
          <ValidationError error={errors.password} />
        </div>
        <div className="form-control">
          <label htmlFor="password_confirm">Password Confirm</label>
          <Controller
            name="password_confirm"
            defaultValue=""
            control={control}
            render={({ field: { ...field } }) => (
              <input {...field} className="input" />
            )}
          />
          <ValidationError error={errors.password_confirm} />
        </div>
        <div className="form-control">
          <label htmlFor="gender">Gender</label>
          <Controller
            name="gender"
            defaultValue=""
            control={control}
            render={({ field: { ...field } }) => (
              <select {...field} className="select">
                <option value="">Select One</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            )}
          />
          <ValidationError error={errors.gender} />
        </div>
        <div className="form-control">
          <label htmlFor="country">Country</label>
          <Controller
            name="country"
            defaultValue=""
            control={control}
            render={({ field: { ...field } }) => (
              <Autocomplete
                items={countries}
                value={String(field.value)}
                onChange={field.onChange}
              />
            )}
          />
          <ValidationError error={errors.password_confirm} />
        </div>
        <div className="form-control">
          <label htmlFor="image">Image</label>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <input
                name={field.name}
                type="file"
                className="input"
                accept="image/png, image/jpeg"
                onChange={(e) =>
                  e.target.files?.[0] && field.onChange(e.target.files?.[0])
                }
              />
            )}
          />
          <ValidationError error={errors.image} />
        </div>
        <div className="form-control">
          <div className="row">
            <label htmlFor="terms">Terms and Conditions agreement</label>
            <Controller
              name="terms"
              defaultValue={false}
              control={control}
              render={({ field: { ...field } }) => (
                <input
                  {...field}
                  type="checkbox"
                  value={1}
                  className="checkbox"
                />
              )}
            />
          </div>
          <ValidationError error={errors.terms} />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={!isValid}>
            Submit
          </button>
        </div>
      </form>
      <Link to="/">Back to Main Page</Link>
    </div>
  );
};

export default ControlledForm;
