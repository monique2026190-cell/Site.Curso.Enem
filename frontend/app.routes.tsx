import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Formulario = lazy(() => import('./paginas/Formulario'));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Formulario />} />
    </Routes>
  );
};

export default AppRoutes;
