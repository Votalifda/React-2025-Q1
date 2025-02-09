import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { IPeopleDetails } from '../types.ts';
import Loader from './Loader.tsx';
import { getIdFromUrl } from '../helpers.ts';
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
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState<IPeopleDetails>();

  const fetchPeopleDetails = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://swapi.dev/api/people/${id}`);
      if (!response.ok) {
        throw new Error('Network response error');
      }
      const data: IPeopleDetails = await response.json();

      setIsLoading(false);
      setItem({
        id: getIdFromUrl(data?.url ?? ''),
        url: data.url,
        name: data.name,
        gender: data.gender,
        birth_year: data.birth_year,
        eye_color: data.eye_color,
        hair_color: data.hair_color,
        skin_color: data.skin_color,
        height: data.height,
        mass: data.mass,
      });
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchPeopleDetails(id).then();
    }
  }, [id, fetchPeopleDetails]);

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
          <button className="btn-close" onClick={handleClose}>
            Close
          </button>
        </>
      )}
    </div>
  );
};

export default CardDetails;
