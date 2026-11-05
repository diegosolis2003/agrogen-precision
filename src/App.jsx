import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import AppShell from './components/layout/AppShell'
import Toasts from './components/ui/Toasts'
import ViewModeToggle from './components/ui/ViewModeToggle'
import Landing from './pages/Landing'
import Diagnose from './pages/Diagnose'
import Dashboard from './pages/Dashboard'
import Metrics from './pages/Metrics'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <AppProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/diagnostico" element={<Diagnose />} />
            <Route path="/panel" element={<Dashboard />} />
            <Route path="/metricas" element={<Metrics />} />
            <Route path="/inversionistas" element={<Navigate to="/metricas" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
        <Toasts />
        <ViewModeToggle />
      </AppProvider>
    </BrowserRouter>
  )
}
