import { FC } from 'react';
import { IForm } from '../../types.ts';

interface Props {
  item: IForm;
}

const Index: FC<Props> = ({ item }) => {
  return (
    <div className="card">
      <div className="card-item">{item.name}</div>
      <div className="card-item">{item.age}</div>
      <div className="card-item">{item.email}</div>
      <div className="card-item">{item.password}</div>
      <div className="card-item">{item.gender}</div>
      <div className="card-item">{item.terms}</div>
      <div className="card-item">{item.country}</div>
      <div className="card-item">{item.image}</div>
    </div>
  );
};

export default Index;
