import { FormEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { IForm } from '../types.ts';
import ValidationError from '../components/ValidationError';
import { addItem } from '../store/slices/formsSlice.ts';
import { Link, useNavigate } from 'react-router-dom';
import Autocomplete from '../components/Autocomplete';
import { RootState } from '../store/store.ts';
import defaultSchema from '../validationSchema.ts';
import { fileToBase64 } from '../helpers.ts';

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
              <input {...field} type="password" className="input" />
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
              <input {...field} type="password" className="input" />
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
                name={field.name}
                items={countries}
                value={String(field.value)}
                onChange={field.onChange}
              />
            )}
          />
          <ValidationError error={errors.country} />
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
