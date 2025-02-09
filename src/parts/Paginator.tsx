import React, { FC } from 'react';
import '../App.css';
import { useSearchParams } from 'react-router-dom';

interface Props {
  total: number;
  ipp?: number;
}

const Paginator: FC<Props> = ({ total, ipp = 10 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const pageNumber = page ? +page : 1;
  const pagesCount = Math.ceil(total / ipp);
  const pagesArray = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement>,
    page: number
  ) => {
    e.stopPropagation();
    searchParams.set('page', `${page}`);
    setSearchParams(searchParams);
  };

  return (
    <div className="paginator">
      {pagesArray &&
        pagesArray.map((item) => (
          <button
            key={item}
            className={`paginator-btn ${item === pageNumber ? 'active' : ''}`}
            onClick={(e) => handleChangePage(e, item)}
          >
            {item}
          </button>
        ))}
    </div>
  );
};

export default Paginator;
