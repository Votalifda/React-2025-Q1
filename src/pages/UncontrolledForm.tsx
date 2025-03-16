import { FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/slices/formsSlice.ts';
import { Link, useNavigate } from 'react-router-dom';
import Autocomplete from '../components/Autocomplete';
import { RootState } from '../store/store.ts';
import defaultSchema from '../validationSchema.ts';
import { Errors } from '../types.ts';
import ValidationError from '../components/ValidationError';
import { ValidationError as YupValidationError } from 'yup';
import { fileToBase64 } from '../helpers.ts';

const UncontrolledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.countries.items);
  const [errors, setErrors] = useState<Errors>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const transformYupErrorsIntoObject = (errors: YupValidationError): Errors => {
    const validationErrors: Errors = {};
    errors.inner.forEach((error) => {
      if (error.path !== undefined) {
        validationErrors[error.path] = {
          message: error.errors[0],
          name: error.path,
        };
      }
    });
    return validationErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
      age: ageRef.current?.value || '',
      password: passwordRef.current?.value || '',
      password_confirm: passwordConfirmRef.current?.value || '',
      gender: genderRef.current?.value || '',
      country: countryRef.current?.value || '',
      terms: termsRef.current?.checked || false,
      image: imageRef.current?.files ? imageRef.current.files[0] : null,
    };

    defaultSchema.validate(formData, { abortEarly: false }).then(
      async () => {
        setErrors({});
        const file64 = formData.image ? await fileToBase64(formData.image) : '';
        dispatch(addItem({ ...formData, image: file64 as string }));
        navigate('/');
      },
      (errors) => {
        setErrors(transformYupErrorsIntoObject(errors));
      }
    );
  };

  return (
    <div className="wrapper">
      <h2>Uncontrolled Form</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input name="name" ref={nameRef} className="input" />
          <ValidationError error={errors.name} />
        </div>
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input name="age" ref={ageRef} className="input" />
          <ValidationError error={errors.age} />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input name="email" ref={emailRef} className="input" />
          <ValidationError error={errors.email} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input name="password" ref={passwordRef} className="input" />
          <ValidationError error={errors.password} />
        </div>
        <div className="form-control">
          <label htmlFor="password_confirm">Password Confirm</label>
          <input
            name="password_confirm"
            ref={passwordConfirmRef}
            className="input"
          />
          <ValidationError error={errors.password_confirm} />
        </div>
        <div className="form-control">
          <label htmlFor="gender">Gender</label>
          <select name="gender" ref={genderRef} className="select">
            <option value="">Select One</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <ValidationError error={errors.gender} />
        </div>
        <div className="form-control">
          <label htmlFor="country">Country</label>
          <Autocomplete
            name="country"
            refValue={countryRef}
            items={countries}
          />
          <ValidationError error={errors.country} />
        </div>
        <div className="form-control">
          <label htmlFor="image">Image</label>
          <input
            name="image"
            ref={imageRef}
            type="file"
            className="input"
            accept="image/png, image/jpeg"
          />
          <ValidationError error={errors.image} />
        </div>
        <div className="form-control">
          <div className="row">
            <label htmlFor="terms">Terms and Conditions agreement</label>
            <input
              name="terms"
              ref={termsRef}
              type="checkbox"
              value={1}
              className="checkbox"
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

export default UncontrolledForm;
