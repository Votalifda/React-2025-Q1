import { Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import CardDetails from './parts/CardDetails.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="details/:id" element={<CardDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
