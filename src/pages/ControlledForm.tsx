import { Controller, useForm } from 'react-hook-form';
import { IForm } from '../types.ts';
import { FormEvent } from 'react';
import ValidationError from '../components/ValidationError';

const ControlledForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onBlur',
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit((data) => {
      console.log('handleFormSubmit', data);
    })();
  };

  return (
    <div className="wrapper">
      <div>Controlled Form</div>
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Controller
            name="name"
            defaultValue=""
            rules={{ required: 'This field is required' }}
            control={control}
            render={({ field: { ...field } }) => (
              <input {...field} className="input" />
            )}
          />
          <ValidationError error={errors.name} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ControlledForm;
