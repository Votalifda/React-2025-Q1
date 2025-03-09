import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetItemQuery } from '../api/api.ts';
import Loader from './Loader.tsx';
import '../App.css';

const CardDetailsRow = ({
  title,
  value,
}: {
  title: string;
  value: string | undefined;
}) => {
  return (
    <li>
      <b>{title}: </b>
      {value}
    </li>
  );
};

const CardDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const { data: item, isLoading } = useGetItemQuery({ id: `${id}` });
  const rows = [
    { title: 'Name', value: item?.name ?? '' },
    { title: 'Gender', value: item?.gender ?? '' },
    { title: 'Birth Year', value: item?.birth_year || '' },
    { title: 'Eye Color', value: item?.eye_color || '' },
    { title: 'Hair Color', value: item?.hair_color || '' },
    { title: 'Skin Color', value: item?.skin_color || '' },
    { title: 'Skin Color', value: item?.height || '' },
    { title: 'Mass', value: item?.mass || '' },
  ];
  const handleClose = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <div className="card-details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <b>Card Details</b>
          </div>
          <ul className="params">
            {rows.map((item) => (
              <CardDetailsRow
                key={`${item.title}-${item.value}`}
                title={item.title}
                value={item.value}
              />
            ))}
          </ul>
          <button
            className="btn-close"
            onClick={handleClose}
            data-testid="close-btn"
          >
            Close
          </button>
        </>
      )}
    </div>
  );
};

export default CardDetails;
