import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import PricingPage from './pages/PricingPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AuthProvider } from './hooks/useAuth.jsx'

function Placeholder({ title }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-white">
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>
      <p className="text-white/80">This is a placeholder page.</p>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0b0c2a] text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/faq" element={<Placeholder title="FAQ" />} />
          <Route path="/contact" element={<Placeholder title="Contact" />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </AuthProvider>
  )
}
