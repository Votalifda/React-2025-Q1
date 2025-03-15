import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import Card from '../components/Card';

const Main = () => {
  const items = useSelector((state: RootState) => state.forms.items);
  return (
    <div className="wrapper">
      <h2>Main Page</h2>
      <div className="actions">
        <Link to="/controlled">Controlled Form</Link>
        <Link to="/uncontrolled">Uncontrolled Form</Link>
      </div>
      <div className="cards-list">
        {!!items.length &&
          items.map((item) => (
            <Card key={`${item.name}_${item.age}_${item.gender}`} item={item} />
          ))}
      </div>
    </div>
  );
};

export default Main;
