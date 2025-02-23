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
            <CardDetailsRow title="Name" value={item?.name} />
            <CardDetailsRow title="Gender" value={item?.gender} />
            <CardDetailsRow title="Birth Year" value={item?.birth_year} />
            <CardDetailsRow title="Eye Color" value={item?.eye_color} />
            <CardDetailsRow title="Hair Color" value={item?.hair_color} />
            <CardDetailsRow title="Skin Color" value={item?.skin_color} />
            <CardDetailsRow title="Height" value={item?.height} />
            <CardDetailsRow title="Mass" value={item?.mass} />
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
