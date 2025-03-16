import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import Card from '../components/Card';
import { useEffect, useState } from 'react';

const Main = () => {
  const [isTimerActive, setIsTimerActive] = useState(true);
  const items = useSelector((state: RootState) => state.forms.items);

  useEffect(() => {
    if (isTimerActive) {
      const timer = setTimeout(() => setIsTimerActive(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isTimerActive]);

  return (
    <div className="wrapper">
      <h2>Main Page</h2>
      <div className="actions">
        <Link to="/controlled">Controlled Form</Link>
        <Link to="/uncontrolled">Uncontrolled Form</Link>
      </div>
      <div className="cards-list">
        {!!items.length &&
          items.map((item, key) => (
            <Card
              key={`${item.name}_${item.age}_${item.gender}`}
              item={item}
              isLatest={items.length === key + 1 && isTimerActive}
            />
          ))}
      </div>
    </div>
  );
};

export default Main;
