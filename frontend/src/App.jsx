import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './context/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import { ROUTE_PATH } from './enum/routePath';

function App() {
  return (
      <ToastProvider>
        <AuthProvider>
          <div className="min-h-screen bg-slate-50">
            <Routes>
              <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
              <Route path={ROUTE_PATH.REGISTER} element={<RegisterPage />} />
              <Route 
                path={ROUTE_PATH.DASHBOARD} 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path={ROUTE_PATH.HOME} element={<Navigate to={ROUTE_PATH.DASHBOARD} replace />} />
              <Route path={ROUTE_PATH.NOTFOUND} element={<Navigate to={ROUTE_PATH.DASHBOARD} replace />} />
            </Routes>
          </div>
        </AuthProvider>
      </ToastProvider>
  );
}

export default App;
