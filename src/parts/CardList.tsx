import { FC } from 'react';
import { ITableItems } from '../types.ts';
import Card from './Card.tsx';
import '../App.css';

const CardList: FC<ITableItems> = ({ items }) => {
  return (
    <div className="table">
      <div className="tableCol tableHeader">Name</div>
      <div className="tableCol tableHeader">Gender</div>
      <div className="tableCol tableHeader">Birth Year</div>
      {items.map((item) => (
        <Card
          key={`${item.name}_${item.gender}_${item.birth_year}`}
          item={item}
        />
      ))}
    </div>
  );
};

export default CardList;
