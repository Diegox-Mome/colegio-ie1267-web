import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Nosotros from './pages/Nosotros'
import Infraestructura from './pages/Infraestructura'
import Noticias from './pages/Noticias'
import Admision from './pages/Admision'
import Contacto from './pages/Contacto'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/infraestructura" element={<Infraestructura />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/admision" element={<Admision />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
