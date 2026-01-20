import { Route, Routes } from 'react-router-dom';
import HomePage from '@/features/home/pages';

const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
);

export default Router;
