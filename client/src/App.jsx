import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { ThemeProvider } from './theme/ThemeProvider';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BuilderPage from './pages/BuilderPage';
import AdminPage from './pages/AdminPage';
import PublicResumePage from './pages/PublicResumePage';
import DashboardPage from './pages/DashboardPage';
import TemplatesPage from './pages/TemplatesPage';
import TemplateSelectionPage from './pages/TemplateSelectionPage';
import AIOnboardingPage from './pages/AIOnboardingPage';
import LandingPage from './pages/LandingPage';

const queryClient = new QueryClient();

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ResumeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <DashboardPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/templates"
                element={
                  <RequireAuth>
                    <TemplatesPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/templates/:categoryId"
                element={
                  <RequireAuth>
                    <TemplateSelectionPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/templates/:categoryId/onboarding/:templateId"
                element={
                  <RequireAuth>
                    <AIOnboardingPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/builder/*"
                element={
                  <RequireAuth>
                    <BuilderPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <RequireAuth>
                    <AdminPage />
                  </RequireAuth>
                }
              />
              <Route path="/r/:username/:slug" element={<PublicResumePage />} />
            </Routes>
          </Router>
          </ResumeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
