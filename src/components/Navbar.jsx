import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Phone, Mail, MapPin, LogIn } from 'lucide-react'
import { useAdmision } from '../context/AdmisionContext'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/infraestructura', label: 'Infraestructura' },
  { to: '/noticias', label: 'Noticias' },
  { to: '/admision', label: 'Admisión' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { admisionInfo } = useAdmision()
  const anio = admisionInfo?.anio_escolar || '2025'

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Barra superior de contacto */}
      <div className="hidden md:flex justify-between items-center bg-primary text-white text-xs px-6 py-1.5">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Phone size={12} /> (01) 123-4567
          </span>
          <span className="flex items-center gap-1">
            <Mail size={12} /> mesadepartes1267@gmail.com
          </span>
        </div>
        <span className="flex items-center gap-1">
          <MapPin size={12} /> ASOC. CASA HUERTA LA CAMPIÑA MZ O LT 2 – Lurigancho, Lima
        </span>
      </div>

      {/* Navbar principal */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3 max-w-7xl mx-auto">
        <NavLink to="/" className="flex items-center gap-3">
          <img src="/images/logo.jpeg" alt="IE Bicentenario 1267" className="h-12 w-12 object-contain" />
          <div className="leading-tight">
            <p className="font-bold text-primary text-sm md:text-base">IE Bicentenario 1267</p>
            <p className="text-xs text-gray-500">La Campiña - Lurigancho</p>
          </div>
        </NavLink>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-primary-light' : 'text-gray-700 hover:text-primary-light'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/admision"
            className="bg-accent-red text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Admisión {anio}
          </NavLink>
          <NavLink
            to="/admin"
            className="flex items-center gap-1 text-sm font-semibold text-primary border border-primary/25 hover:bg-primary/5 px-3 py-1.5 rounded-md transition-colors"
          >
            <LogIn size={15} />
            <span>Acceso Admin</span>
          </NavLink>
        </nav>

        <button className="lg:hidden text-primary" onClick={() => setOpen(!open)} aria-label="Abrir menú">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <nav className="lg:hidden flex flex-col gap-1 px-4 pb-4 bg-white border-t">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-2 px-2 rounded text-sm font-medium ${
                  isActive ? 'bg-blue-50 text-primary-light' : 'text-gray-700'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/admin"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 py-2.5 px-3 mt-2 rounded-md text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-colors"
          >
            <LogIn size={16} />
            <span>Acceso Admin</span>
          </NavLink>
        </nav>
      )}
    </header>
  )
}
