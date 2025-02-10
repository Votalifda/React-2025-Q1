import React, { FC, Fragment } from 'react';
import { ITableItem } from '../types.ts';
import '../App.css';

interface Props {
  item: ITableItem;
  handleOnCardClick: (url: string) => void;
}

const Card: FC<Props> = ({ item, handleOnCardClick }) => {
  const { id, name, gender, birth_year } = item;
  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleOnCardClick(id);
  };
  return (
    <Fragment>
      <a href="#" onClick={handleCardClick} className="tableCol">
        {name}
      </a>
      <div className="tableCol">{gender}</div>
      <div className="tableCol">{birth_year}</div>
    </Fragment>
  );
};

export default Card;
