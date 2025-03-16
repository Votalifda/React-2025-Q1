import { Controller, useForm } from 'react-hook-form';
import { IForm } from '../types.ts';
import { FormEvent } from 'react';
import ValidationError from '../components/ValidationError';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/slices/formsSlice.ts';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailPattern } from '../validationRules.ts';

const defaultSchema = yup.object().shape({
  name: yup.string().required('This field is required'),
  email: yup
    .string()
    .required('This field is required')
    .test(
      'is-empty-or-match',
      'Invalid Email Address',
      function (value: string) {
        return value === '' || emailPattern.value.test(value);
      }
    ),
  age: yup.string().required(),
  password: yup.string().required(),
  password_confirm: yup.string().required(),
  gender: yup.string().required(),
  country: yup.string().required(),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms')
    .required('This field is required'),
  image: yup.string().required(),
});

const ControlledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onBlur',
    resolver: yupResolver<IForm>(defaultSchema),
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(
      (data) => {
        console.log('handleFormSubmit', data);
        dispatch(addItem(data));
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
            defaultValue=""
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
          <button type="submit">Submit</button>
        </div>
      </form>
      <Link to="/">Back to Main Page</Link>
    </div>
  );
};

export default ControlledForm;
