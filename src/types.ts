export interface IForm {
  name: string;
  age: number | string;
  email: string;
  password: string;
  password_confirm: string;
  gender: string;
  country: string;
  terms: boolean;
  image: File;
}

export interface IFormValues extends Omit<IForm, 'image'> {
  image: string;
}

export type Errors = { [key: string]: Error };
