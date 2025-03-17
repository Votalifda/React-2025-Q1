import { FC } from 'react';
import { IFormValues } from '../../types.ts';

interface Props {
  item: IFormValues;
  isLatest?: boolean;
}

const Index: FC<Props> = ({ item, isLatest = false }) => {
  return (
    <div className={`card ${isLatest && 'latest'}`}>
      <div className="card-title">Name:</div>
      <div className="card-item">{item.name}</div>
      <div className="card-title">Age:</div>
      <div className="card-item">{item.age}</div>
      <div className="card-title">Email:</div>
      <div className="card-item">{item.email}</div>
      <div className="card-title">Password:</div>
      <div className="card-item">{item.password}</div>
      <div className="card-title">Gender:</div>
      <div className="card-item">{item.gender}</div>
      <div className="card-title">Country:</div>
      <div className="card-item">{item.country}</div>
      <div className="card-title">Terms:</div>
      <div className="card-item">{item.terms ? 'Yes' : 'No'}</div>
      <div className="card-title">Image:</div>
      <div className="card-item">
        <img width={150} src={item.image} />
      </div>
    </div>
  );
};

export default Index;
