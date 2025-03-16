export const emailPattern = {
  value:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  message: 'Invalid Email Address',
};

export const zipPattern = {
  value: /^[0-9\b]+$/,
  message: 'Invalid Zip Code',
};

export const passwordPattern = {
  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()-=_+]{8,}$/,
  message:
    'Minimum 8 characters, at least one uppercase and lowercase letter and one number',
};

export const passwordPatternHard = {
  //value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/,
  //value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-={}[\]\\|;:"'<>,.?/]{8,}$/,
  value:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]\\|;:"'<>,.?/])[a-zA-Z\d!@#$%^&*()_+\-={}[\]\\|;:"'<>,.?/]{8,}$/,
  message:
    'Minimum 8 characters, at least one uppercase and lowercase letter and one number and one special character',
};

export const yearPattern = {
  // value: /^(202[0-9]|203[0-9]|204[0-9]|2050)?$/, // (2020 - 2050)
  value: /^(0000|202[0-9]|203[0-9]|204[0-9]|2050)?$/,
  message: 'Invalid Year',
};
