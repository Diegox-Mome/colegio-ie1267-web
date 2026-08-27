import PageHeader from '../components/PageHeader'
import { Sparkles, Users2, ShieldCheck } from 'lucide-react'

const niveles = [
  {
    nombre: 'Nivel Inicial', edad: '3, 4 y 5 años', desc: 'Desarrollo integral del niño a través del juego y la exploración',
    aulas: '4 aulas', aulasDesc: 'Dos aulas de 3 años, una de 4 años y una de 5 años', horario: '8:00 AM - 1:00 PM',
    competencias: ['Desarrollo de la autonomía personal', 'Habilidades comunicativas básicas', 'Socialización y convivencia', 'Psicomotricidad y coordinación', 'Creatividad y expresión artística'],
    metodologia: 'Aprendizaje a través del juego, exploración sensorial, actividades lúdicas y desarrollo de la autonomía personal.',
  },
  {
    nombre: 'Nivel Primaria', edad: '6 a 11 años', desc: 'Formación de competencias básicas y hábitos de estudio',
    aulas: '24 aulas', aulasDesc: '4 secciones por grado (1° a 6°)', horario: '8:00 AM - 1:00 PM',
    competencias: ['Comprensión lectora y escritura', 'Razonamiento matemático', 'Ciencia y tecnología', 'Ciudadanía y valores', 'Arte y educación física'],
    metodologia: 'Metodologías activas que fomentan la participación, trabajo colaborativo y desarrollo del pensamiento crítico.',
  },
  {
    nombre: 'Nivel Secundaria', edad: '12 a 17 años', desc: 'Preparación para la educación superior y el mundo laboral',
    aulas: '21 aulas', aulasDesc: 'Promedio de 4 secciones por grado (1° a 5°)', horario: '7:30 AM - 2:30 PM',
    competencias: ['Pensamiento crítico y científico', 'Competencias comunicativas avanzadas', 'Orientación vocacional', 'Liderazgo y emprendimiento', 'Investigación e innovación'],
    metodologia: 'Aprendizaje basado en proyectos, investigación, uso de tecnología y orientación vocacional.',
  },
]

const espacios = [
  { title: 'Aulas Modernas', cant: '49 aulas', desc: 'Espacios amplios y bien iluminados, diseñados para facilitar el aprendizaje colaborativo y el uso de metodologías activas.', items: ['Iluminación natural optimizada', 'Mobiliario ergonómico', 'Sistemas de ventilación adecuados', 'Pizarras interactivas'] },
  { title: 'Laboratorio de Ciencias', cant: '2 laboratorios', desc: 'Espacios completamente equipados para la experimentación y el desarrollo del pensamiento científico en nuestros estudiantes.', items: ['Equipamiento científico moderno', 'Mesas de trabajo especializadas', 'Sistema de seguridad integral', 'Material didáctico actualizado'] },
  { title: 'Laboratorio de Tecnología', cant: '3 laboratorios', desc: 'Centros tecnológicos equipados para el desarrollo de competencias digitales y el aprendizaje de herramientas informáticas.', items: ['Computadoras de última generación', 'Software educativo especializado', 'Conexión a internet de alta velocidad', 'Proyectores multimedia'] },
  { title: 'Taller de Cocina', cant: '1 taller completo', desc: 'Espacio diseñado para enseñar habilidades culinarias, nutrición y emprendimiento gastronómico.', items: ['Cocinas industriales seguras', 'Utensilios profesionales', 'Área de almacenamiento', 'Normas de higiene y seguridad'] },
  { title: 'Aulas de Innovación Pedagógica', cant: '3 aulas especiales', desc: 'Espacios tecnológicos diseñados para implementar metodologías innovadoras y el uso de recursos digitales.', items: ['Equipamiento tecnológico avanzado', 'Mobiliario flexible', 'Pizarras digitales interactivas', 'Acceso a plataformas educativas'] },
]

export default function Infraestructura() {
  return (
    <div>
      <PageHeader
        title="Infraestructura y Niveles Educativos"
        subtitle="Conoce nuestras modernas instalaciones del Programa Escuelas Bicentenario y los tres niveles educativos que ofrecemos con enfoque por competencias."
      />

      {/* Niveles */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-primary-dark text-center mb-10">Niveles Educativos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {niveles.map((n) => (
            <div key={n.nombre} className="border rounded-lg p-6">
              <h3 className="font-bold text-primary text-lg">{n.nombre}</h3>
              <p className="text-sm text-primary-light">{n.edad}</p>
              <p className="text-sm text-gray-500 mt-1 mb-4">{n.desc}</p>
              <p className="text-xs uppercase text-gray-400">Información General</p>
              <p className="text-sm text-gray-700">{n.aulas} — {n.aulasDesc}</p>
              <p className="text-sm text-gray-700 mt-1">Horario: {n.horario}</p>
              <p className="text-xs uppercase text-gray-400 mt-4 mb-1">Competencias Principales</p>
              <ul className="text-sm text-gray-600 list-disc pl-4 space-y-0.5">
                {n.competencias.map((c) => <li key={c}>{c}</li>)}
              </ul>
              <p className="text-xs uppercase text-gray-400 mt-4 mb-1">Metodología</p>
              <p className="text-sm text-gray-600">{n.metodologia}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 text-center max-w-lg mx-auto">
          <div><p className="text-2xl font-bold text-primary">49</p><p className="text-xs text-gray-500">Aulas totales</p></div>
          <div><p className="text-2xl font-bold text-primary">1,460</p><p className="text-xs text-gray-500">Estudiantes</p></div>
          <div><p className="text-2xl font-bold text-primary">62</p><p className="text-xs text-gray-500">Docentes</p></div>
        </div>
      </section>

      {/* Programa Escuelas Bicentenario */}
      <section className="bg-primary text-white py-14 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Programa Escuelas Bicentenario</h2>
          <p className="text-blue-100 mb-8">Infraestructura del futuro para la educación peruana</p>
          <p className="max-w-3xl mx-auto text-blue-100 mb-8">
            En 2024, fuimos beneficiados con una nueva sede construida bajo los estándares del
            Programa Escuelas Bicentenario del MINEDU, que representa la inversión más importante
            en infraestructura educativa del país.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 rounded-lg p-5">
              <p className="font-semibold">Entrega: 2024</p>
              <p className="text-sm text-blue-100">Nueva infraestructura completamente moderna y funcional</p>
            </div>
            <div className="bg-white/10 rounded-lg p-5">
              <p className="font-semibold">Diseño Especializado</p>
              <p className="text-sm text-blue-100">Arquitectura pensada específicamente para el proceso educativo</p>
            </div>
            <div className="bg-white/10 rounded-lg p-5">
              <p className="font-semibold">Capacidad Ampliada</p>
              <p className="text-sm text-blue-100">Espacios diseñados para atender a toda nuestra comunidad educativa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Espacios especializados */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-primary-dark text-center mb-10">Espacios Especializados</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {espacios.map((e) => (
            <div key={e.title} className="border rounded-lg p-6">
              <h3 className="font-semibold text-primary-dark">{e.title}</h3>
              <p className="text-sm text-primary-light mb-2">{e.cant}</p>
              <p className="text-sm text-gray-500 mb-3">{e.desc}</p>
              <p className="text-xs uppercase text-gray-400 mb-1">Características Principales</p>
              <ul className="text-sm text-gray-600 list-disc pl-4 space-y-0.5">
                {e.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Ventajas */}
      <section className="bg-gray-50 py-14 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-primary-dark mb-10">Ventajas de Nuestra Nueva Infraestructura</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6">
              <Sparkles className="mx-auto text-primary-light mb-3" size={28} />
              <h3 className="font-semibold text-primary-dark">Innovación Pedagógica</h3>
              <p className="text-sm text-gray-500 mt-2">Espacios diseñados para implementar metodologías modernas y tecnología educativa de vanguardia.</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <Users2 className="mx-auto text-primary-light mb-3" size={28} />
              <h3 className="font-semibold text-primary-dark">Bienestar Estudiantil</h3>
              <p className="text-sm text-gray-500 mt-2">Ambientes seguros, cómodos y ergonómicos que promueven el bienestar y el rendimiento académico.</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <ShieldCheck className="mx-auto text-primary-light mb-3" size={28} />
              <h3 className="font-semibold text-primary-dark">Calidad Educativa</h3>
              <p className="text-sm text-gray-500 mt-2">Instalaciones que cumplen con los más altos estándares para brindar educación de primer nivel.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
