import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importaremos nossas páginas em breve
// Por enquanto, vamos criar telas temporárias para testar as rotas

function LoginTemp() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
      <h1 className="text-2xl font-bold">Tela de Login - FacilitaLab</h1>
    </div>
  );
}

function DashboardTemp() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-100 text-slate-800">
      <h1 className="text-2xl font-bold">Dashboard Geral - FacilitaLab</h1>
    </div>
  );
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginTemp />} />
        <Route path="/dashboard" element={<DashboardTemp />} />
      </Routes>
    </BrowserRouter>
  );
}