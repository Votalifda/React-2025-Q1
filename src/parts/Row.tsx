import React, { FC, Fragment } from 'react';
import { ITableItem } from '../types.ts';
import '../App.css';

const Row: FC<{ item: ITableItem }> = ({ item }) => {
  const { name, gender, birth_year } = item;
  return (
    <Fragment>
      <div className="tableCol">{name}</div>
      <div className="tableCol">{gender}</div>
      <div className="tableCol">{birth_year}</div>
    </Fragment>
  );
};

export default Row;
