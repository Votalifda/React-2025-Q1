import { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ITableItem } from '../types.ts';
import Card from './Card.tsx';
import Paginator from './Paginator.tsx';
import '../App.css';

interface Props {
  items: Array<ITableItem>;
  handleOnCardClick: (url: string) => void;
  total: number;
}

const CardList: FC<Props> = ({ items, handleOnCardClick, total }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleOnClick = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <div className="cards-wrapper" onClick={handleOnClick}>
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
      <Paginator total={total} />
    </div>
  );
};

export default CardList;
