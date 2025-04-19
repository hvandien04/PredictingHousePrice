import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Feedback from './components/Feedback';
import Home from './pages/Home';
import InputForm from './pages/InputForm';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Compare from './pages/Compare';
import History from './pages/History';
import SellHouse from './pages/SellHouse';
import SellHistory from './pages/SellHistory';
import Profile from './pages/Profile';
import Statistics from './pages/Statistics';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';
import HousePosts from './pages/admin/HousePosts';
import FeedbackPage from './pages/admin/Feedback';
import { AuthProvider } from './context/AuthContext';
import { HPredictedProvider } from './context/HPredictedContext';
import ScrollToTop from "./hooks/ScrollToTop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const RequireAdmin = () => {
    const {user} = useAuth();

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    if (user.role !== '1') {
      return <Navigate to="/" replace />;
    }

    return <AdminLayout />;
  };

  return (
      <div className="app">
        {!isAdminRoute && <Navbar />}
        <main className="main-content">
          <ScrollToTop />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/input" element={<InputForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/history" element={<History />} />
            <Route path="/sell-house" element={<SellHouse />} />
            <Route path="/sell-history" element={<SellHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userID" element={<Profile />} />
            <Route path="/statistics" element={<Statistics />} />

            {/* Admin routes */}
            <Route path="/admin" element={<RequireAdmin />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="house-posts" element={<HousePosts />} />
              <Route path="feedback" element={<FeedbackPage />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <Feedback />}
      </div>
  );
}

function App() {
  return (
      <HPredictedProvider>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </HPredictedProvider>
  );
}

export default App;
