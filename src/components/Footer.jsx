import { Link } from 'react-router-dom'
import { Facebook, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <img src="/images/logo.jpeg" alt="Logo" className="h-10 w-10 object-contain" />
            <div>
              <p className="text-white font-semibold">IE Bicentenario 1267</p>
              <p className="text-xs">La Campiña</p>
            </div>
          </div>
          <p className="text-gray-400">
            Institución educativa pública de calidad, formando estudiantes íntegros con valores
            bicentenarios para el futuro del Perú.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Enlaces Rápidos</h4>
          <ul className="space-y-2">
            <li><Link to="/nosotros" className="hover:text-white">Nosotros</Link></li>
            <li><Link to="/infraestructura" className="hover:text-white">Infraestructura</Link></li>
            <li><Link to="/noticias" className="hover:text-white">Noticias</Link></li>
            <li><Link to="/admision" className="hover:text-white">Admisión</Link></li>
            <li><Link to="/contacto" className="hover:text-white">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contacto</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> ASOC. CASA HUERTA LA CAMPIÑA MZ O LT 2, Lurigancho, Lima, Perú</li>
            <li className="flex items-center gap-2"><Phone size={16} /> (01) 123-4567</li>
            <li className="flex items-center gap-2"><Mail size={16} /> mesadepartes1267@gmail.com</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Horarios</h4>
          <p>Lun - Vie: 7:30 AM - 4:00 PM</p>
          <p>Sáb: 8:00 AM - 12:00 PM</p>
          <h4 className="text-white font-semibold mt-4 mb-2">Síguenos</h4>
          <a href="#" className="inline-flex items-center gap-2 hover:text-white"><Facebook size={18} /> Facebook</a>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs text-gray-400 py-4">
        © {new Date().getFullYear()} Institución Educativa Bicentenario 1267 - La Campiña. Todos los derechos reservados.
        <br />
        Fundada en 1993 • Sede Bicentenario desde 2024
      </div>
    </footer>
  )
}
