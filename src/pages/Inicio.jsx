import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Users, Award, Building2, FileText, Newspaper, Layers, Phone, History } from 'lucide-react'
import { supabase } from '../supabaseClient'
import FloatingSocialButtons from '../components/FloatingSocialButtons'
import { useAdmision } from '../context/AdmisionContext'

const heroSlides = [
  {
    image: '/images/hero-slide1.jpg',
    alt: 'Estudiantes IE 1267 Bicentenario La Campiña'
  },
  {
    image: '/images/hero-slide2.jpg',
    alt: 'Inauguración Nueva Infraestructura IE 1267'
  },
  {
    image: '/images/hero.jpeg',
    alt: 'Instalaciones Modernas IE Bicentenario 1267'
  }
]

const values = [
  {
    icon: GraduationCap,
    title: 'Educación Integral',
    text: 'Formamos estudiantes competentes con enfoque en el desarrollo integral.',
    borderColor: 'border-l-[5px] border-l-[#0b3b95]',
    iconColor: 'text-[#0b3b95]'
  },
  {
    icon: Users,
    title: 'Comunidad Unida',
    text: 'Trabajamos en equipo: estudiantes, padres y docentes por un objetivo común.',
    borderColor: 'border-l-[5px] border-l-[#10a349]',
    iconColor: 'text-[#10a349]'
  },
  {
    icon: Award,
    title: 'Valores Bicentenario',
    text: 'Fomentamos respeto, responsabilidad, honradez y disciplina en cada acción.',
    borderColor: 'border-l-[5px] border-l-[#0ea5e9]',
    iconColor: 'text-[#0ea5e9]'
  },
]

export default function Inicio() {
  const [estadisticas, setEstadisticas] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const { admisionInfo } = useAdmision()
  const anio = admisionInfo?.anio_escolar || '2025'

  const quickAccess = [
    { icon: FileText, title: `Admisión ${anio}`, text: 'Inscripciones abiertas para el próximo año escolar', to: '/admision' },
    { icon: Newspaper, title: 'Noticias', text: 'Mantente al día con las últimas novedades', to: '/noticias' },
    { icon: Layers, title: 'Niveles Educativos', text: 'Inicial, Primaria y Secundaria', to: '/infraestructura' },
    { icon: Phone, title: 'Contacto', text: 'Comunícate con nosotros', to: '/contacto' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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
    <div className="relative">
      {/* Botones flotantes de redes sociales (exclusivo para Inicio) */}
      <FloatingSocialButtons />

      {/* Hero Carrusel */}
      <section className="relative overflow-hidden min-h-[640px] md:min-h-[720px] flex flex-col justify-between">
        {/* Slides con transición de opacidad */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Gradient Overlay semitransparente de izquierda a derecha (azul #0b3b95 a verde #10a349, opacidad 80-85%) */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(11, 59, 149, 0.85), rgba(16, 163, 73, 0.82))'
          }}
        />

        {/* Contenido Principal Hero */}
        <div className="relative z-20 max-w-5xl mx-auto text-center text-white px-6 pt-20 pb-8 md:pt-28 md:pb-10 flex-1 flex flex-col justify-center items-center">
          <p className="uppercase tracking-widest text-blue-200 text-sm mb-3 font-semibold">Institución Educativa</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-sm">
            Bicentenario 1267 <br /> La Campiña
          </h1>
          <p className="mt-4 italic text-blue-100">"Estudio, Trabajo, Honradez, Disciplina"</p>
          <p className="mt-4 max-w-2xl mx-auto text-gray-100 text-sm md:text-base leading-relaxed">
            Formando estudiantes íntegros con valores bicentenarios para construir el futuro del
            Perú. Educación de calidad con infraestructura moderna en el corazón de Lurigancho.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/admision" className="bg-accent-red hover:bg-red-700 transition-colors px-6 py-3 rounded-md font-semibold shadow-md">
              Admisión {anio}
            </Link>
            <Link to="/contacto" className="bg-white/15 hover:bg-white/25 border border-white/40 transition-colors px-6 py-3 rounded-md font-semibold backdrop-blur-xs">
              Solicitar Información
            </Link>
          </div>

          {/* Indicadores / Puntos */}
          <div className="mt-8 flex items-center gap-2.5">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Ir al slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-7 bg-white shadow'
                    : 'w-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Sección de Estadísticas sobre la parte inferior del carrusel */}
        <div className="relative z-20 w-full border-t border-white/15 bg-black/15 backdrop-blur-xs py-6 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Users className="text-sky-300 mb-1.5" size={30} />
              <p className="text-2xl md:text-3xl font-bold text-white leading-tight">{estadisticas?.estudiantes || '1460'}</p>
              <p className="text-xs md:text-sm text-white/90 font-medium mt-1">Estudiantes</p>
            </div>
            <div className="flex flex-col items-center">
              <GraduationCap className="text-sky-300 mb-1.5" size={30} />
              <p className="text-2xl md:text-3xl font-bold text-white leading-tight">{estadisticas?.docentes || '62'}</p>
              <p className="text-xs md:text-sm text-white/90 font-medium mt-1">Docentes</p>
            </div>
            <div className="flex flex-col items-center">
              <History className="text-sky-300 mb-1.5" size={30} />
              <p className="text-2xl md:text-3xl font-bold text-white leading-tight">{estadisticas?.anios_historia || '31'}</p>
              <p className="text-xs md:text-sm text-white/90 font-medium mt-1">Años de Historia</p>
            </div>
            <div className="flex flex-col items-center">
              <Building2 className="text-sky-300 mb-1.5" size={30} />
              <p className="text-2xl md:text-3xl font-bold text-white leading-tight">2024</p>
              <p className="text-xs md:text-sm text-white/90 font-medium mt-1">Sede Moderna</p>
            </div>
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
            <div key={v.title} className={`p-6 rounded-lg bg-white border border-gray-200 ${v.borderColor} shadow-xs hover:shadow-md transition-shadow`}>
              <v.icon className={`mx-auto ${v.iconColor} mb-3`} size={32} />
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
