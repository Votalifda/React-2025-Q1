import { Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import CardDetails from './parts/CardDetails.tsx';
import Page404 from './Page404.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="details/:id" element={<CardDetails />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;
