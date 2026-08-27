import PageHeader from '../components/PageHeader'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const timeline = [
  { period: '1993-2000', title: 'Fundación y Primeros Pasos', text: 'Inicio de operaciones con nivel primario, estableciendo las bases de nuestra identidad educativa.' },
  { period: '2001-2010', title: 'Expansión de Niveles', text: 'Incorporación progresiva de nivel inicial y secundario, completando la oferta educativa integral.' },
  { period: '2011-2023', title: 'Consolidación y Crecimiento', text: 'Fortalecimiento de la propuesta pedagógica y reconocimiento en la comunidad educativa.' },
  { period: '2024', title: 'Nueva Infraestructura Bicentenario', text: 'Entrega de la moderna sede como parte del Programa Escuelas Bicentenario del MINEDU.' },
]

const directivos = [
  { name: 'Mg. Oscar Eulogio Vargas Rodríguez', role: 'Director General', text: 'Líder educativo con amplia experiencia en gestión escolar y mejora continua.' },
  { name: 'Ana Karina Delgado Bolivar', role: 'Subdirectora de Secundaria' },
  { name: 'Margarita Ynca Maldonado', role: 'Subdirectora de Secundaria' },
  { name: 'Cecilia Bertha Navarro Dávalos', role: 'Subdirectora de Primaria e Inicial' },
  { name: 'Sara Ynoquio', role: 'Coordinadora de Inicial' },
]

const coordSecundaria = [
  { name: 'Rosario Alvarez Huamán', role: 'Coord. de Matemática' },
  { name: 'Marilu Escalante', role: 'Coord. de Comunicación' },
  { name: 'Sergio Vera', role: 'Coord. de C y T' },
  { name: 'Robert Ochoa', role: 'Coord. de Inglés' },
  { name: 'Jorge Bobadilla', role: 'Coord. de Arte' },
  { name: 'Marylin Perleche', role: 'Coord. de CCSS-DPCC' },
  { name: 'Daniel Vasquez', role: 'Coord. de Ed. Física' },
  { name: 'Maria Elena Anco', role: 'Coord. de Ed. Religiosa' },
  { name: 'Karina Mejía', role: 'Coord. de EPT' },
]

const valores = [
  ['Respeto', 'Valoramos la dignidad de cada persona'],
  ['Responsabilidad', 'Cumplimos nuestros compromisos'],
  ['Inclusión', 'Acogemos la diversidad con alegría'],
  ['Tolerancia', 'Aceptamos las diferencias con comprensión'],
  ['Empatía', 'Nos ponemos en el lugar del otro'],
  ['Honradez', 'Actuamos con transparencia y verdad'],
  ['Disciplina', 'Mantenemos el orden y la constancia'],
  ['Solidaridad', 'Ayudamos a quien lo necesita'],
  ['Justicia', 'Tratamos a todos con equidad'],
  ['Amor', 'Base fundamental de toda relación'],
]

const compromisos = [
  { n: '01', title: 'Progreso anual de aprendizajes', text: 'Garantizar que todos los estudiantes logren aprendizajes de calidad.', acciones: ['Monitoreo continuo de los logros de aprendizaje', 'Reforzamiento pedagógico personalizado', 'Evaluación diagnóstica y formativa'] },
  { n: '02', title: 'Acceso y permanencia escolar', text: 'Asegurar que todos los estudiantes accedan y se mantengan en la escuela.', acciones: ['Estrategias de retención estudiantil', 'Apoyo socioemocional integral', 'Seguimiento a la asistencia regular'] },
  { n: '03', title: 'Calendarización y gestión', text: 'Cumplir la calendarización planificada en la institución educativa.', acciones: ['Planificación anual efectiva', 'Gestión eficiente del tiempo escolar', 'Cumplimiento de horas pedagógicas'] },
  { n: '04', title: 'Acompañamiento pedagógico', text: 'Fortalecer el desempeño docente para mejorar los aprendizajes.', acciones: ['Formación continua del personal', 'Monitoreo y retroalimentación', 'Comunidades de aprendizaje'] },
  { n: '05', title: 'Gestión de la convivencia escolar', text: 'Promover un clima escolar favorable para el aprendizaje.', acciones: ['Normas de convivencia participativas', 'Resolución pacífica de conflictos', 'Ambiente seguro y acogedor'] },
]

export default function Nosotros() {
  const [info, setInfo] = useState(null)

  useEffect(() => {
    async function fetchContactoInfo() {
      try {
        const { data, error } = await supabase
          .from('web_contacto_info')
          .select('*')
          .limit(1)
        
        if (!error && data && data.length > 0) {
          setInfo(data[0])
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchContactoInfo()
  }, [])

  return (
    <div>
      <PageHeader title="Nosotros" subtitle="Conoce la historia, el equipo directivo y los datos generales de nuestra institución educativa." />

      {/* Historia */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-primary-dark text-center">Nuestra Historia</h2>
        <p className="text-center text-gray-500 mb-10">Más de tres décadas formando el futuro del Perú</p>

        <div className="bg-blue-50 rounded-lg p-6 mb-10">
          <p className="font-semibold text-primary">Fundación: 1993</p>
          <p className="text-gray-600 mt-2">
            La Institución Educativa Bicentenario 1267 - La Campiña fue fundada en 1993 con la
            noble misión de brindar educación de calidad a la comunidad de Lurigancho. Desde sus
            inicios, nos hemos caracterizado por nuestro compromiso con la excelencia académica y
            la formación integral de nuestros estudiantes.
          </p>
        </div>

        <div className="space-y-6">
          {timeline.map((t) => (
            <div key={t.period} className="flex gap-4">
              <div className="w-28 shrink-0 font-bold text-primary-light">{t.period}</div>
              <div>
                <h3 className="font-semibold text-primary-dark">{t.title}</h3>
                <p className="text-sm text-gray-500">{t.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 text-center max-w-md mx-auto">
          <div>
            <p className="text-3xl font-bold text-primary">31 Años</p>
            <p className="text-sm text-gray-500">de trayectoria educativa</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">Generaciones</p>
            <p className="text-sm text-gray-500">de egresados exitosos</p>
          </div>
        </div>
      </section>

      {/* Equipo directivo */}
      <section className="bg-gray-50 py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-primary-dark text-center mb-10">Equipo Directivo</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {directivos.map((d) => (
              <div key={d.name} className="bg-white rounded-lg p-5 shadow-sm">
                <p className="font-semibold text-primary-dark">{d.name}</p>
                <p className="text-sm text-primary-light">{d.role}</p>
                {d.text && <p className="text-xs text-gray-500 mt-2">{d.text}</p>}
              </div>
            ))}
          </div>
          <h3 className="font-semibold text-primary-dark mb-4 text-center">Coordinación de Secundaria</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {coordSecundaria.map((c) => (
              <div key={c.name} className="bg-white rounded-lg p-4 text-sm shadow-sm">
                <p className="font-medium text-primary-dark">{c.name}</p>
                <p className="text-gray-500">{c.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misión / Visión */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-primary-dark text-center mb-10">Misión, Visión y Valores</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold text-primary-dark mb-2">Nuestra Misión</h3>
            <p className="text-xs uppercase text-gray-400 mb-3">El propósito que nos mueve cada día</p>
            <p className="text-sm text-gray-600">
              Somos una institución educativa pública que brinda una formación integral de calidad
              a nuestros estudiantes, basada en el enfoque por competencias y el currículo
              nacional, promoviendo valores bicentenarios como el respeto, la responsabilidad, la
              inclusión, la tolerancia, la empatía, la honradez, la disciplina, la solidaridad, la
              justicia y el amor.
            </p>
            <p className="text-sm text-gray-600 mt-3">
              Formamos ciudadanos críticos, creativos e innovadores, capaces de contribuir al
              desarrollo sostenible de su comunidad y del país, en un ambiente de convivencia
              democrática y respeto por la diversidad cultural.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold text-primary-dark mb-2">Nuestra Visión</h3>
            <p className="text-xs uppercase text-gray-400 mb-3">El futuro que queremos construir</p>
            <p className="text-sm text-gray-600">
              Al 2028, ser reconocida como una institución educativa líder en la formación integral
              de estudiantes competentes, que se destaque por la excelencia académica, la
              innovación pedagógica y el fortalecimiento de valores bicentenarios.
            </p>
            <p className="text-sm text-gray-600 mt-3">
              Aspiramos a tener egresados que sean agentes de cambio positivo en la sociedad, con
              sólida preparación académica, pensamiento crítico, conciencia ambiental y espíritu
              emprendedor, contribuyendo al progreso de Lurigancho y del Perú.
            </p>
          </div>
        </div>

        <h3 className="font-semibold text-primary-dark text-center mt-14 mb-8">Nuestros Valores Bicentenario</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {valores.map(([title, text]) => (
            <div key={title} className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="font-semibold text-primary text-sm">{title}</p>
              <p className="text-xs text-gray-500 mt-1">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Propuesta pedagógica */}
      <section className="bg-gray-50 py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-primary-dark text-center mb-2">Propuesta Pedagógica</h2>
          <p className="text-center text-gray-500 mb-10">Basado en el Currículo Nacional de la Educación Básica</p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-primary-dark mb-2">Enfoque por Competencias</h3>
              <p className="text-sm text-gray-600">
                Nuestra propuesta pedagógica se fundamenta en el enfoque por competencias
                establecido en el Currículo Nacional de la Educación Básica (CNEB), que busca
                desarrollar en los estudiantes la capacidad de combinar un conjunto de capacidades
                para lograr un propósito específico en situaciones determinadas.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-primary-dark mb-2">Convivencia Escolar</h3>
              <p className="text-sm text-gray-600">
                Promovemos una convivencia escolar democrática basada en el respeto mutuo, la
                participación activa y la resolución pacífica de conflictos, creando un ambiente
                favorable para el aprendizaje y el desarrollo personal de todos los miembros de la
                comunidad educativa.
              </p>
            </div>
          </div>

          <h3 className="font-semibold text-primary-dark text-center mb-6">Enfoques Pedagógicos Específicos</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
            {[
              ['Desarrollo Socioemocional', 'Fortalecemos las habilidades emocionales y sociales de nuestros estudiantes para una formación integral.'],
              ['Innovación Pedagógica', 'Implementamos metodologías modernas y recursos tecnológicos para enriquecer el proceso de enseñanza-aprendizaje.'],
              ['Pensamiento Crítico', 'Desarrollamos la capacidad de análisis, reflexión y toma de decisiones informadas en nuestros estudiantes.'],
              ['Conciencia Ambiental', 'Promovemos el cuidado del medio ambiente y el desarrollo sostenible como parte de la formación ciudadana.'],
              ['Emprendimiento', 'Fomentamos el espíritu emprendedor y la capacidad de generar ideas innovadoras para el futuro.'],
            ].map(([title, text]) => (
              <div key={title} className="bg-white rounded-lg p-4 text-sm">
                <p className="font-semibold text-primary-dark mb-1">{title}</p>
                <p className="text-gray-500 text-xs">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Propuesta de gestión */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-primary-dark text-center mb-2">Propuesta de Gestión</h2>
        <p className="text-center text-gray-500 mb-2">Resolución Ministerial N° 189-2021-MINEDU</p>
        <p className="text-center text-gray-500 text-sm mb-10 max-w-2xl mx-auto">
          Nuestra propuesta de gestión se fundamenta en los cinco compromisos de gestión escolar
          establecidos en la RM-189-2021-MINEDU, que constituyen prácticas de la gestión
          consideradas sustanciales para asegurar que los estudiantes aprendan.
        </p>

        <div className="space-y-6">
          {compromisos.map((c) => (
            <div key={c.n} className="flex gap-5 border rounded-lg p-5">
              <div className="text-3xl font-bold text-primary-light shrink-0">{c.n}</div>
              <div>
                <h3 className="font-semibold text-primary-dark">{c.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{c.text}</p>
                <ul className="text-xs text-gray-500 list-disc pl-4 space-y-0.5">
                  {c.acciones.map((a) => <li key={a}>{a}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Datos generales */}
      <section className="bg-gray-50 py-14 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-primary-dark mb-3">Ubicación</h3>
            <p className="text-sm text-gray-500">Dirección:</p>
            <p className="text-sm text-gray-700 mb-2">{info?.direccion || 'ASOC. CASA HUERTA LA CAMPIÑA MZ O LT 2, Lurigancho, Lima, Perú'}</p>
            <p className="text-sm text-gray-500">Distrito:</p>
            <p className="text-sm text-gray-700">San Juan de Lurigancho</p>
          </div>
          <div>
            <h3 className="font-semibold text-primary-dark mb-3">Comunidad Educativa</h3>
            <p className="text-sm text-gray-700">1,460 <span className="text-gray-500">Estudiantes matriculados</span></p>
            <p className="text-sm text-gray-700">62 <span className="text-gray-500">Docentes especializados</span></p>
            <p className="text-sm text-gray-700">49 <span className="text-gray-500">Aulas disponibles</span></p>
          </div>
          <div>
            <h3 className="font-semibold text-primary-dark mb-3">Contacto</h3>
            <p className="text-sm text-gray-500">Teléfono:</p>
            <p className="text-sm text-gray-700 mb-2">{info?.telefono || '(01) 123-4567'}</p>
            <p className="text-sm text-gray-500">Email:</p>
            <p className="text-sm text-gray-700 mb-2">{info?.email || 'mesadepartes1267@gmail.com'}</p>
            <p className="text-sm text-gray-500">Horario de Atención:</p>
            <p className="text-sm text-gray-700">{info?.horarios || info?.horario || 'Lun - Vie: 7:30 AM - 4:00 PM / Sáb: 8:00 AM - 12:00 PM'}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
