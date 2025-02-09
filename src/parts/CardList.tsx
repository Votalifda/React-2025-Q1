import { FC } from 'react';
import { ITableItem } from '../types.ts';
import Card from './Card.tsx';
import '../App.css';

interface Props {
  items: Array<ITableItem>;
  handleOnCardClick: (url: string) => void;
}

const CardList: FC<Props> = ({ items, handleOnCardClick }) => {
  return (
    <div className="table">
      <div className="tableCol tableHeader">Name</div>
      <div className="tableCol tableHeader">Gender</div>
      <div className="tableCol tableHeader">Birth Year</div>
      {items.map((item) => (
        <Card
          key={`${item.name}_${item.gender}_${item.birth_year}`}
          item={item}
          handleOnCardClick={handleOnCardClick}
        />
      ))}
    </div>
  );
};

export default CardList;
