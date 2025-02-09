import React, { FC } from 'react';
import { ITableItems } from '../types.ts';
import Row from './Row.tsx';
import '../App.css';

const Table: FC<ITableItems> = ({ items }) => {
  return (
    <div className="table">
      <div className="tableCol tableHeader">Name</div>
      <div className="tableCol tableHeader">Gender</div>
      <div className="tableCol tableHeader">Birth Year</div>
      {items.map((item) => (
        <Row
          key={`${item.name}_${item.gender}_${item.birth_year}`}
          item={item}
        />
      ))}
    </div>
  );
};

export default Table;
