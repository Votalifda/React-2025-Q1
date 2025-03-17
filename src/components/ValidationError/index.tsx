import { FC } from 'react';
import { FieldError, Merge } from 'react-hook-form';

interface Props {
  error?: Merge<FieldError, (FieldError | undefined)[]> | undefined | Error;
}

const Index: FC<Props> = ({ error }) => {
  return !!error && <div className="error">{error.message}</div>;
};

export default Index;
