import React, { lazy, Suspense, useEffect } from 'react';
import { RootState, useAppSelector } from './components/store';
import './styles/global.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';

const Login = lazy(() => import('./pages/Login'));
const UserList = lazy(() => import('./pages/UserList'));

const App: React.FC = () => {
  const theme = useAppSelector((state: RootState) => state.theme.mode);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/users', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <Suspense
      fallback={
        <div className="loadingContainer">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
