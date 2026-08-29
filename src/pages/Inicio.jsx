import { Link } from 'react-router-dom'
import { GraduationCap, Users, Award, Building2, FileText, Newspaper, Layers, Phone } from 'lucide-react'



const values = [
  { icon: GraduationCap, title: 'Educación Integral', text: 'Formamos estudiantes competentes con enfoque en el desarrollo integral.' },
  { icon: Users, title: 'Comunidad Unida', text: 'Trabajamos en equipo: estudiantes, padres y docentes por un objetivo común.' },
  { icon: Award, title: 'Valores Bicentenario', text: 'Fomentamos respeto, responsabilidad, honradez y disciplina en cada acción.' },
]

const quickAccess = [
  { icon: FileText, title: 'Admisión 2025', text: 'Inscripciones abiertas para el próximo año escolar', to: '/admision' },
  { icon: Newspaper, title: 'Noticias', text: 'Mantente al día con las últimas novedades', to: '/noticias' },
  { icon: Layers, title: 'Niveles Educativos', text: 'Inicial, Primaria y Secundaria', to: '/infraestructura' },
  { icon: Phone, title: 'Contacto', text: 'Comunícate con nosotros', to: '/contacto' },
]

import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Inicio() {
  const [estadisticas, setEstadisticas] = useState(null)

  useEffect(() => {
    async function fetchEstadisticas() {
      try {
        const { data, error } = await supabase
          .from('web_estadisticas')
          .select('*')
          .eq('id', 1)
          .single()
        
        if (!error && data) {
          setEstadisticas(data)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchEstadisticas()
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src="/images/hero.jpeg" alt="IE Bicentenario 1267" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary-dark/75" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center text-white px-6 py-24 md:py-32">
          <p className="uppercase tracking-widest text-blue-200 text-sm mb-3">Institución Educativa</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Bicentenario 1267 <br /> La Campiña
          </h1>
          <p className="mt-4 italic text-blue-100">"Estudio, Trabajo, Honradez, Disciplina"</p>
          <p className="mt-4 max-w-2xl mx-auto text-gray-200">
            Formando estudiantes íntegros con valores bicentenarios para construir el futuro del
            Perú. Educación de calidad con infraestructura moderna en el corazón de Lurigancho.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/admision" className="bg-accent-red hover:bg-red-700 transition-colors px-6 py-3 rounded-md font-semibold">
              Admisión 2025
            </Link>
            <Link to="/contacto" className="bg-white/10 hover:bg-white/20 border border-white/40 transition-colors px-6 py-3 rounded-md font-semibold">
              Solicitar Información
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white -mt-1 border-b">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-10 text-center">
          <div>
            <p className="text-3xl font-bold text-primary">{estadisticas?.estudiantes || '1,460'}</p>
            <p className="text-sm text-gray-500">Estudiantes</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">{estadisticas?.docentes || '62'}</p>
            <p className="text-sm text-gray-500">Docentes</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">{estadisticas?.anios_historia || '31'}</p>
            <p className="text-sm text-gray-500">Años de Historia</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">2024</p>
            <p className="text-sm text-gray-500">Sede Moderna</p>
          </div>
        </div>
      </section>

      {/* Bienvenida */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-dark">Bienvenidos a Nuestra Comunidad Educativa</h2>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          Desde 1993, la Institución Educativa Bicentenario 1267 - La Campiña ha sido un pilar
          fundamental en la educación de Lurigancho. Con nuestra moderna infraestructura entregada
          en 2024 como parte del Programa Escuelas Bicentenario, continuamos forjando el futuro de
          nuestros estudiantes con excelencia académica y valores sólidos.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div key={v.title} className="p-6 rounded-lg border hover:shadow-md transition-shadow">
              <v.icon className="mx-auto text-primary-light mb-3" size={32} />
              <h3 className="font-semibold text-primary-dark">{v.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Acceso rápido */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary-dark mb-10">Acceso Rápido</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {quickAccess.map((q) => (
              <Link key={q.title} to={q.to} className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <q.icon className="mx-auto text-primary-light mb-3" size={28} />
                <h3 className="font-semibold text-primary-dark">{q.title}</h3>
                <p className="text-xs text-gray-500 mt-2">{q.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-primary text-white py-16 px-6 text-center">
        <Building2 className="mx-auto mb-4" size={36} />
        <h2 className="text-2xl md:text-3xl font-bold">¿Listo para ser parte de nuestra familia educativa?</h2>
        <p className="mt-3 text-blue-100">Descubre todo lo que tenemos para ofrecer a tu hijo/a</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link to="/admision" className="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-blue-50">
            Ver Proceso de Admisión
          </Link>
          <Link to="/contacto" className="border border-white px-6 py-3 rounded-md font-semibold hover:bg-white/10">
            Solicitar Información
          </Link>
        </div>
      </section>
    </div>
  )
}
