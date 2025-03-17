import { Outlet } from 'react-router-dom';

const Index = () => {
  return (
    <div className="layout">
      <Outlet />
    </div>
  );
};

export default Index;
