import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { ThemeProvider } from './context/ThemeContext';

// Layout
import Navbar from './components/layout/Navbar';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TemplatesPage from './pages/TemplatesPage';
import TemplateSelectionPage from './pages/TemplateSelectionPage';
import AIOnboardingPage from './pages/AIOnboardingPage';
import BuilderPage from './pages/BuilderPage';
import DashboardPage from './pages/DashboardPage';
import PublicResumePage from './pages/PublicResumePage';
import AdminPage from './pages/AdminPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  return children;
};

const NavbarWithConditionalRender = () => {
  const { pathname } = useLocation();
  const isAdminPath = pathname.startsWith('/admin');

  if (isAdminPath) return null;
  return <Navbar />;
};

function AppRoutes() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)]">
        <NavbarWithConditionalRender />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/r/:slug" element={<PublicResumePage />} />

            {/* Private Routes */}
            <Route path="/templates" element={
              <ProtectedRoute>
                <TemplatesPage />
              </ProtectedRoute>
            } />
            <Route path="/templates/:categoryId" element={
              <ProtectedRoute>
                <TemplateSelectionPage />
              </ProtectedRoute>
            } />
            <Route path="/ai-generator/:categoryId/:templateId" element={
              <ProtectedRoute>
                <AIOnboardingPage />
              </ProtectedRoute>
            } />
            <Route path="/builder" element={
              <ProtectedRoute>
                <BuilderPage />
              </ProtectedRoute>
            } />
            <Route path="/builder/:id" element={
              <ProtectedRoute>
                <BuilderPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid rgba(99, 102, 241, 0.2)',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ResumeProvider>
          <AppRoutes />
        </ResumeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
