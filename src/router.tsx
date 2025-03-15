import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main.tsx';
import ControlledForm from './pages/ControlledForm.tsx';
import UncontrolledForm from './pages/UncontrolledForm.tsx';
import Page404 from './Page404.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="controlled" element={<ControlledForm />} />
      <Route path="uncontrolled" element={<UncontrolledForm />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;
