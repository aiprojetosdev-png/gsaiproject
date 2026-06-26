import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './features/auth/LoginPage'
import Dashboard from './features/dashboard/Dashboard'
import ProspectionPage from './features/prospection/ProspectionPage'
import PipelinePage from './features/pipeline/PipelinePage'
import ClientsPage from './features/clients/ClientsPage'
import ReportsPage from './features/reports/ReportsPage'
import FinanceiroPage from './features/financeiro/FinanceiroPage'
import EquipePage from './features/equipe/EquipePage'
import ResumosPage from './features/resumos/ResumosPage'

function AppContent() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const handleLogin = (u) => {
    setUser(u)
    navigate('/dashboard', { replace: true })
  }

  const handleLogout = () => {
    setUser(null)
    navigate('/', { replace: true })
  }

  if (!user) return <LoginPage onLogin={handleLogin} />

  return (
    <Layout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/"           element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard"  element={<Dashboard />} />
        <Route path="/prospeccao" element={<ProspectionPage />} />
        <Route path="/pipeline"   element={<PipelinePage />} />
        <Route path="/clientes"   element={<ClientsPage />} />
        <Route path="/financeiro" element={<FinanceiroPage />} />
        <Route path="/equipe"     element={<EquipePage />} />
        <Route path="/resumos"    element={<ResumosPage />} />
        <Route path="/relatorios" element={<ReportsPage />} />
        <Route path="*"           element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
