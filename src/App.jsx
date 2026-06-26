import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './features/auth/LoginPage'
import Dashboard from './features/dashboard/Dashboard'
import ProspectionPage from './features/prospection/ProspectionPage'
import PipelinePage from './features/pipeline/PipelinePage'
import ClientsPage from './features/clients/ClientsPage'
import ReportsPage from './features/reports/ReportsPage'
import FinanceiroPage from './features/financeiro/FinanceiroPage'
import EquipePage from './features/equipe/EquipePage'

export default function App() {
  const [user, setUser] = useState(null)

  if (!user) return <LoginPage onLogin={u => setUser(u)} />

  return (
    <BrowserRouter>
      <Layout user={user} onLogout={() => setUser(null)}>
        <Routes>
          <Route path="/"            element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard"   element={<Dashboard />} />
          <Route path="/prospeccao"  element={<ProspectionPage />} />
          <Route path="/pipeline"    element={<PipelinePage />} />
          <Route path="/clientes"    element={<ClientsPage />} />
          <Route path="/financeiro"  element={<FinanceiroPage />} />
          <Route path="/equipe"      element={<EquipePage />} />
          <Route path="/relatorios"  element={<ReportsPage />} />
          <Route path="*"            element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
