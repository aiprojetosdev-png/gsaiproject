import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './features/auth/LoginPage'
import Dashboard from './features/dashboard/Dashboard'
import ProspectionPage from './features/prospection/ProspectionPage'
import PipelinePage from './features/pipeline/PipelinePage'
import ClientsPage from './features/clients/ClientsPage'
import ReportsPage from './features/reports/ReportsPage'

export default function App() {
  const [user, setUser] = useState(null)

  const handleLogin  = (u) => setUser(u)
  const handleLogout = () => setUser(null)

  if (!user) return <LoginPage onLogin={handleLogin} />

  return (
    <BrowserRouter>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/"             element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard"    element={<Dashboard />} />
          <Route path="/prospeccao"   element={<ProspectionPage />} />
          <Route path="/pipeline"     element={<PipelinePage />} />
          <Route path="/clientes"     element={<ClientsPage />} />
          <Route path="/relatorios"   element={<ReportsPage />} />
          <Route path="*"             element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
