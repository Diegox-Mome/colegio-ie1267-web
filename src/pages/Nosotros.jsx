import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { User, Target, Eye, GraduationCap, History, Heart, Users, Handshake, CheckCircle2, Clock, Anchor, Award, Sparkles, Book, Brain, Lightbulb, Leaf, Briefcase, MapPin, Phone, CalendarDays } from 'lucide-react'

const timeline = [
  { period: '1993-2000', title: 'Fundación y Primeros Pasos', text: 'Inicio de operaciones con nivel primario, estableciendo las bases de nuestra identidad educativa.', color: 'text-blue-600', dot: 'bg-blue-600' },
  { period: '2001-2010', title: 'Expansión de Niveles', text: 'Incorporación progresiva de nivel inicial y secundario, completando la oferta educativa integral.', color: 'text-emerald-600', dot: 'bg-emerald-600' },
  { period: '2011-2023', title: 'Consolidación y Crecimiento', text: 'Fortalecimiento de la propuesta pedagógica y reconocimiento en la comunidad educativa.', color: 'text-sky-500', dot: 'bg-sky-500' },
  { period: '2024', title: 'Nueva Infraestructura Bicentenario', text: 'Entrega de la moderna sede como parte del Programa Escuelas Bicentenario del MINEDU.', color: 'text-red-500', dot: 'bg-red-500' },
]

const valores = [
  { title: 'Respeto', text: 'Valoramos la dignidad de cada persona', icon: Heart },
  { title: 'Responsabilidad', text: 'Cumplimos nuestros compromisos', icon: CheckCircle2 },
  { title: 'Inclusión', text: 'Acogemos la diversidad con alegría', icon: Users },
  { title: 'Tolerancia', text: 'Aceptamos las diferencias con comprensión', icon: Handshake },
  { title: 'Empatía', text: 'Nos ponemos en el lugar del otro', icon: Heart },
  { title: 'Honradez', text: 'Actuamos con transparencia y verdad', icon: Anchor },
  { title: 'Disciplina', text: 'Mantenemos el orden y la constancia', icon: Clock },
  { title: 'Solidaridad', text: 'Ayudamos a quien lo necesita', icon: Handshake },
  { title: 'Justicia', text: 'Tratamos a todos con equidad', icon: Award },
  { title: 'Amor', text: 'Base fundamental de toda relación', icon: Sparkles },
]

const compromisos = [
  { n: '01', title: 'Progreso anual de aprendizajes', text: 'Garantizar que todos los estudiantes logren aprendizajes de calidad.', acciones: ['Monitoreo continuo de los logros de aprendizaje', 'Reforzamiento pedagógico personalizado', 'Evaluación diagnóstica y formativa'] },
  { n: '02', title: 'Acceso y permanencia escolar', text: 'Asegurar que todos los estudiantes accedan y se mantengan en la escuela.', acciones: ['Estrategias de retención estudiantil', 'Apoyo socioemocional integral', 'Seguimiento a la asistencia regular'] },
  { n: '03', title: 'Calendarización y gestión', text: 'Cumplir la calendarización planificada en la institución educativa.', acciones: ['Planificación anual efectiva', 'Gestión eficiente del tiempo escolar', 'Cumplimiento de horas pedagógicas'] },
  { n: '04', title: 'Acompañamiento pedagógico', text: 'Fortalecer el desempeño docente para mejorar los aprendizajes.', acciones: ['Formación continua del personal', 'Monitoreo y retroalimentación', 'Comunidades de aprendizaje'] },
  { n: '05', title: 'Gestión de la convivencia escolar', text: 'Promover un clima escolar favorable para el aprendizaje.', acciones: ['Normas de convivencia participativas', 'Resolución pacífica de conflictos', 'Ambiente seguro y acogedor'] },
]

// Lógica mejorada para clasificar en los 5 grupos exactos
function categorizeMember(cargo) {
  const c = (cargo || '').toLowerCase();
  if (c.includes('director general') || c.includes('directora general')) return 'Equipo Directivo';
  if (c.includes('subdirector') || c.includes('subdirección')) return 'Subdirección General';
  if (c.includes('inicial')) return 'Coordinación de Inicial';
  if (c.includes('grado') || c.includes('primaria')) return 'Coordinación de Primaria';
  return 'Coordinación de Secundaria';
}

// Estilos premium por cada grupo basados en los colores de tu diseño original
const SECTION_STYLES = {
  'Equipo Directivo': { text: 'text-[#0f172a]', bg: 'bg-slate-50', border: 'border-slate-200' },
  'Subdirección General': { text: 'text-[#16a34a]', bg: 'bg-green-50', border: 'border-green-200' },
  'Coordinación de Inicial': { text: 'text-[#0ea5e9]', bg: 'bg-sky-50', border: 'border-sky-200' },
  'Coordinación de Primaria': { text: 'text-[#0f172a]', bg: 'bg-slate-50', border: 'border-slate-200' },
  'Coordinación de Secundaria': { text: 'text-[#dc2626]', bg: 'bg-red-50', border: 'border-red-200' },
};

// Orden exacto de aparición
const ORDERED_GROUPS = [
  'Equipo Directivo',
  'Subdirección General',
  'Coordinación de Inicial',
  'Coordinación de Primaria',
  'Coordinación de Secundaria'
];

export default function Nosotros() {
  const [info, setInfo] = useState(null)
  const [equipo, setEquipo] = useState([])
  const [estadisticas, setEstadisticas] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchData() {
      try {
        const [resInfo, resEquipo, resEstadisticas] = await Promise.all([
          supabase.from('web_contacto_info').select('*').limit(1),
          supabase.from('web_equipo').select('*').order('id', { ascending: true }),
          supabase.from('web_estadisticas').select('*').eq('id', 1).single()
        ])

        if (!resInfo.error && resInfo.data && resInfo.data.length > 0) setInfo(resInfo.data[0])
        if (!resEquipo.error) setEquipo(resEquipo.data || [])
        if (!resEstadisticas.error && resEstadisticas.data) setEstadisticas(resEstadisticas.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  // Agrupación ejecutada con la nueva lógica
  const groupedEquipo = equipo.reduce((acc, member) => {
    const group = categorizeMember(member.cargo);
    if (!acc[group]) acc[group] = [];
    acc[group].push(member);
    return acc;
  }, {});

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Banner Principal Clean */}
      <section className="bg-white py-16 px-6 text-center border-b border-slate-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] mb-4 tracking-tight">Nosotros</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
          Conoce la historia, el equipo directivo y los datos generales de nuestra institución educativa.
        </p>
      </section>

      {/* Historia (Diseño Premium) */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#0f172a] to-[#059669] p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">Nuestra Historia</h2>
            <p className="text-slate-200 text-sm font-medium">Más de tres décadas formando el futuro del Perú</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 p-8 lg:p-12">
            <div className="lg:col-span-7 space-y-8">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <CalendarDays className="text-[#0f172a] w-6 h-6" />
                  <h3 className="text-xl font-bold text-[#0f172a]">Fundación: 1993</h3>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  La Institución Educativa Bicentenario 1267 - La Campiña fue fundada en 1993 con la noble misión de brindar educación de calidad a la comunidad de Lurigancho. Desde sus inicios, nos hemos caracterizado por nuestro compromiso con la excelencia académica y la formación integral de nuestros estudiantes.
                </p>
              </div>

              <div className="space-y-6">
                {timeline.map((t) => (
                  <div key={t.period} className="flex gap-4 items-start">
                    <div className={`mt-1.5 w-3 h-3 rounded-full shrink-0 ${t.dot}`}></div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm mb-1">
                        <span className={`${t.color} mr-2`}>{t.period}:</span>
                        {t.title}
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{t.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-5 flex flex-col justify-center gap-6">
              <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <History className="text-[#0f172a] w-8 h-8 stroke-[1.5]" />
                </div>
                <p className="text-4xl font-black text-[#0f172a] mb-1 tracking-tight">{estadisticas?.anios_historia || '31'} Años</p>
                <p className="text-slate-500 text-sm font-medium">de trayectoria educativa</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="text-[#059669] w-8 h-8 stroke-[1.5]" />
                </div>
                <p className="text-3xl font-black text-[#0f172a] mb-1 tracking-tight">Generaciones</p>
                <p className="text-slate-500 text-sm font-medium">de egresados exitosos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión / Visión */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-[#0f172a] text-center mb-12">Misión, Visión y Valores</h2>
        
        <div className="space-y-8 mb-16">
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
            <div className="bg-[#0f172a] py-6 px-8 flex flex-col items-center justify-center text-center">
              <Target className="w-10 h-10 text-white/90 mb-3 stroke-[1.5]" />
              <h3 className="text-2xl font-bold text-white">Nuestra Misión</h3>
              <p className="text-slate-300 text-sm mt-1">El propósito que nos mueve cada día</p>
            </div>
            <div className="p-8 md:p-12 text-center">
              <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto mb-4">
                Somos una institución educativa pública que brinda una formación integral de calidad a nuestros estudiantes, basada en el enfoque por competencias y el currículo nacional, promoviendo valores bicentenarios como el respeto, la responsabilidad, la inclusión, la tolerancia, la empatía, la honradez, la disciplina, la solidaridad, la justicia y el amor.
              </p>
              <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Formamos ciudadanos críticos, creativos e innovadores, capaces de contribuir al desarrollo sostenible de su comunidad y del país, en un ambiente de convivencia democrática y respeto por la diversidad cultural.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
            <div className="bg-[#059669] py-6 px-8 flex flex-col items-center justify-center text-center">
              <Eye className="w-10 h-10 text-white/90 mb-3 stroke-[1.5]" />
              <h3 className="text-2xl font-bold text-white">Nuestra Visión</h3>
              <p className="text-emerald-100 text-sm mt-1">El futuro que queremos construir</p>
            </div>
            <div className="p-8 md:p-12 text-center">
              <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto mb-4">
                Al 2028, ser reconocida como una institución educativa líder en la formación integral de estudiantes competentes, que se destaque por la excelencia académica, la innovación pedagógica y el fortalecimiento de valores bicentenarios.
              </p>
              <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Aspiramos a tener egresados que sean agentes de cambio positivo en la sociedad, con sólida preparación académica, pensamiento crítico, conciencia ambiental y espíritu emprendedor, contribuyendo al progreso de Lurigancho y del Perú.
              </p>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-[#0f172a] text-center mb-8 text-2xl">Nuestros Valores Bicentenario</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {valores.map((v, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4 text-[#0f172a]">
                <v.icon size={22} strokeWidth={1.5} />
              </div>
              <h4 className="font-bold text-slate-800 mb-1.5 text-sm">{v.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 
        EQUIPO DIRECTIVO REDISEÑADO 
        Agrupado en las 5 categorías con diseño premium
      */}
      <section className="bg-white border-y border-slate-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f172a] text-center mb-16">Equipo Directivo</h2>
          
          <div className="space-y-16">
            {ORDERED_GROUPS.map((groupName) => {
              const members = groupedEquipo[groupName];
              // Evita renderizar secciones vacías si no hay personal asignado
              if (!members || members.length === 0) return null;
              
              const styles = SECTION_STYLES[groupName] || SECTION_STYLES['Equipo Directivo'];

              return (
                <div key={groupName} className="relative">
                  <h3 className={`text-xl font-bold text-center mb-10 ${styles.text}`}>
                    {groupName}
                  </h3>
                  
                  <div className="flex flex-wrap justify-center gap-6">
                    {members.map((member) => (
                      <div key={member.id} className="w-full sm:w-[280px] bg-white rounded-2xl p-6 text-center shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-slate-100 transition-all hover:-translate-y-1 hover:shadow-xl group">
                        
                        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 border ${styles.bg} ${styles.border}`}>
                          <User className={`${styles.text} w-8 h-8 stroke-[1.5]`} />
                        </div>
                        
                        <h4 className="font-bold text-slate-800 mb-1.5 text-[15px] leading-tight">{member.nombre}</h4>
                        <p className={`text-xs font-semibold ${styles.text} opacity-90`}>{member.cargo}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Propuesta pedagógica */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-[#0f172a] text-center mb-2">Propuesta Pedagógica</h2>
        <p className="text-center text-slate-500 mb-12">Basado en el Currículo Nacional de la Educación Básica</p>

        <div className="bg-[#0f172a] p-8 rounded-t-3xl flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
          <Book className="text-[#059669] w-10 h-10 stroke-[1.5]" />
          <div>
            <h3 className="text-2xl font-bold text-white">Fundamento Teórico</h3>
            <p className="text-slate-300 text-sm mt-1">Basado en el Currículo Nacional de la Educación Básica</p>
          </div>
        </div>
        <div className="bg-white border-x border-b border-slate-100 rounded-b-3xl p-8 md:p-12 shadow-sm mb-16">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h4 className="text-lg font-bold text-[#0f172a] mb-3">Enfoque por Competencias</h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                Nuestra propuesta pedagógica se fundamenta en el enfoque por competencias establecido en el Currículo Nacional de la Educación Básica (CNEB), que busca desarrollar en los estudiantes la capacidad de combinar un conjunto de capacidades para lograr un propósito específico en situaciones determinadas.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#059669] mb-3">Convivencia Escolar</h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                Promovemos una convivencia escolar democrática basada en el respeto mutuo, la participación activa y la resolución pacífica de conflictos, creando un ambiente favorable para el aprendizaje y el desarrollo personal de todos los miembros de la comunidad educativa.
              </p>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-[#0f172a] text-center mb-10 text-2xl">Enfoques Pedagógicos Específicos</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {[
            ['Desarrollo Socioemocional', 'Fortalecemos las habilidades emocionales y sociales de nuestros estudiantes para una formación integral.', Brain],
            ['Innovación Pedagógica', 'Implementamos metodologías modernas y recursos tecnológicos para enriquecer el proceso de enseñanza-aprendizaje.', Lightbulb],
            ['Pensamiento Crítico', 'Desarrollamos la capacidad de análisis, reflexión y toma de decisiones informadas en nuestros estudiantes.', Target],
            ['Conciencia Ambiental', 'Promovemos el cuidado del medio ambiente y el desarrollo sostenible como parte de la formación ciudadana.', Leaf],
            ['Emprendimiento', 'Fomentamos el espíritu emprendedor y la capacidad de generar ideas innovadoras para el futuro.', Briefcase],
          ].map(([title, text, Icon]) => (
            <div key={title} className="bg-white rounded-3xl p-6 text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 bg-slate-50 text-[#0f172a]">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <p className="font-bold text-slate-800 mb-2 text-sm">{title}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Propuesta de gestión */}
      <section className="bg-white border-y border-slate-100 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f172a] text-center mb-2">Propuesta de Gestión</h2>
          <p className="text-center text-slate-500 mb-12">Resolución Ministerial N° 189-2021-MINEDU</p>

          <div className="bg-[#059669] p-8 rounded-3xl flex flex-col items-center justify-center gap-3 shadow-md mb-12 text-center">
            <Target className="text-white w-10 h-10 stroke-[1.5]" />
            <h3 className="text-2xl font-bold text-white">Marco de Referencia</h3>
            <p className="text-emerald-50 text-sm max-w-2xl mx-auto mt-2">
              Nuestra propuesta de gestión se fundamenta en los cinco compromisos de gestión escolar establecidos en la RM-189-2021-MINEDU, que constituyen prácticas de la gestión consideradas sustanciales para asegurar que los estudiantes aprendan.
            </p>
          </div>

          <h3 className="font-bold text-[#0f172a] text-center mb-10 text-2xl">Los Cinco Compromisos de Gestión Escolar</h3>

          <div className="space-y-5">
            {compromisos.map((c) => (
              <div key={c.n} className="flex flex-col md:flex-row bg-slate-50 rounded-2xl p-6 shadow-sm border border-slate-100 items-start md:items-center">
                <div className="flex items-center gap-4 md:w-1/3 mb-4 md:mb-0">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                    <span className="text-lg font-black text-[#0f172a]">{c.n}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0f172a] leading-tight">{c.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{c.text}</p>
                  </div>
                </div>
                <div className="md:w-2/3 md:border-l border-slate-200 md:pl-8">
                  <p className="text-xs font-bold text-[#059669] uppercase tracking-wider mb-3">Acciones Específicas</p>
                  <ul className="text-sm text-slate-600 space-y-2">
                    {c.acciones.map((a) => (
                      <li key={a} className="flex items-start gap-2">
                        <CheckCircle2 className="text-[#059669] w-4 h-4 shrink-0 mt-0.5" strokeWidth={2} />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Datos generales */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <MapPin className="text-[#059669] w-6 h-6" />
              <h3 className="text-lg font-bold text-[#0f172a]">Ubicación</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Dirección:</p>
                <p className="text-sm font-semibold text-slate-700">{info?.direccion || 'ASOC. CASA HUERTA LA CAMPIÑA MZ O LT 2, Lurigancho, Lima'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Distrito:</p>
                <p className="text-sm font-semibold text-slate-700">San Juan de Lurigancho</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <Users className="text-[#059669] w-6 h-6" />
              <h3 className="text-lg font-bold text-[#0f172a]">Comunidad Educativa</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <p className="text-2xl font-black text-[#0f172a] leading-none">{estadisticas?.estudiantes || '1,460'}</p>
                <p className="text-sm font-medium text-slate-500 pb-0.5">Estudiantes matriculados</p>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-black text-[#0f172a] leading-none">{estadisticas?.docentes || '62'}</p>
                <p className="text-sm font-medium text-slate-500 pb-0.5">Docentes especializados</p>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-black text-[#0f172a] leading-none">{estadisticas?.aulas || '49'}</p>
                <p className="text-sm font-medium text-slate-500 pb-0.5">Aulas disponibles</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <Phone className="text-[#059669] w-6 h-6" />
              <h3 className="text-lg font-bold text-[#0f172a]">Contacto</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Teléfono:</p>
                <p className="text-sm font-semibold text-slate-700">{info?.telefono || '(01) 123-4567'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Email:</p>
                <p className="text-sm font-semibold text-slate-700 break-all">{info?.email || 'mesadepartes1267@gmail.com'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium mb-1">Horario de Atención:</p>
                <p className="text-sm font-semibold text-slate-700">{info?.horarios || info?.horario || 'Lun - Vie: 7:30 AM - 4:00 PM / Sáb: 8:00 AM - 12:00 PM'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}