import { AuthProvider } from './context/AuthContext'
import { AppRoutes } from './routes/AppRoutes'
import { ToastProvider } from './components/Toast'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </AuthProvider>
  )
}

export { App }
export default App