import React, { ChangeEvent, FC, Fragment } from 'react';
import { ITableItem } from '../types.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store/store";
import { addItem, removeItem } from '../store/slices/selectedItemsSlice.ts';
import '../App.css';

interface Props {
  item: ITableItem;
  handleOnCardClick: (url: string) => void;
}

const Card: FC<Props> = ({ item, handleOnCardClick }) => {
  const { id, name, gender, birth_year } = item;
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleOnCardClick(id);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(addItem(item));
    } else if (!event.target.checked) {
      dispatch(removeItem(item));
    }
  };

  return (
    <Fragment>
      <div className="tableCol">
        <input
          type="checkbox"
          value={id}
          checked={!!selectedItems.find((item) => item.id === id)}
          onChange={handleCheckboxChange}
        />
      </div>
      <a href="#" onClick={handleCardClick} className="tableCol">
        {name}
      </a>
      <div className="tableCol">{gender}</div>
      <div className="tableCol">{birth_year}</div>
    </Fragment>
  );
};

export default Card;
