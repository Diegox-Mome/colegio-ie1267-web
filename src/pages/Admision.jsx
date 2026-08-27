import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react'

const niveles = [
  { nombre: 'Nivel Inicial', edad: '3, 4 y 5 años', extra: '4 aulas disponibles', desc: 'Desarrollo integral a través del juego', horario: '8:00 AM - 1:00 PM' },
  { nombre: 'Nivel Primaria', edad: '6 a 11 años', extra: '24 secciones', desc: 'Enfoque por competencias', horario: '8:00 AM - 1:00 PM' },
  { nombre: 'Nivel Secundaria', edad: '12 a 17 años', extra: '21 secciones', desc: 'Orientación vocacional', horario: '7:30 AM - 2:30 PM' },
]

const roadmap = [
  { n: 1, title: 'Solicitud de Información', text: 'Completa el formulario de solicitud de información o acércate a nuestra secretaría.' },
  { n: 2, title: 'Entrega de Documentos', text: 'Presenta todos los documentos requeridos según el nivel educativo de tu hijo/a.' },
  { n: 3, title: 'Evaluación y Entrevista', text: 'Participación en proceso de evaluación integral y entrevista familiar.' },
  { n: 4, title: 'Matrícula', text: 'Confirmación de vacante y proceso de matrícula oficial.' },
]

const requisitos = ['Presentar vacante', 'Actualización de datos', 'DNI del apoderado', 'DNI del estudiante', 'Libreta de notas', 'Pago de derechos de APAFA', 'Otros']

const grados = [
  'Inicial - 3 años', 'Inicial - 4 años', 'Inicial - 5 años',
  'Primaria - 1° grado', 'Primaria - 2° grado', 'Primaria - 3° grado', 'Primaria - 4° grado', 'Primaria - 5° grado', 'Primaria - 6° grado',
  'Secundaria - 1° año', 'Secundaria - 2° año', 'Secundaria - 3° año', 'Secundaria - 4° año', 'Secundaria - 5° año',
]

export default function Admision() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    estudiante: '', nacimiento: '', nivel: '', apoderado: '', dni: '', telefono: '', email: '', direccion: '', comentarios: '',
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`Solicitud de información - Admisión ${form.estudiante || ''}`)
    const body = encodeURIComponent(
      `Nombre del estudiante: ${form.estudiante}\nFecha de nacimiento: ${form.nacimiento}\nNivel educativo: ${form.nivel}\nApoderado: ${form.apoderado}\nDNI apoderado: ${form.dni}\nTeléfono: ${form.telefono}\nEmail: ${form.email}\nDirección: ${form.direccion}\nComentarios: ${form.comentarios}`
    )
    window.location.href = `mailto:mesadepartes1267@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div>
      <PageHeader
        title="Admisión 2025"
        subtitle="¡Las inscripciones están abiertas! Únete a nuestra familia educativa Bicentenario y brinda a tu hijo/a la mejor educación integral."
      />

      <section className="max-w-5xl mx-auto px-6 py-10 text-center">
        <span className="inline-block bg-accent-red/10 text-accent-red text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          Inscripciones abiertas hasta marzo 2025
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-primary-dark">¡Forma parte de la excelencia educativa!</h2>
        <p className="text-gray-500 mt-2">Educación de calidad con valores bicentenarios en moderna infraestructura</p>
      </section>

      {/* Niveles */}
      <section className="max-w-5xl mx-auto px-6 pb-14">
        <h3 className="text-xl font-bold text-primary-dark text-center mb-8">Niveles Educativos Disponibles</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {niveles.map((n) => (
            <div key={n.nombre} className="border rounded-lg p-6 text-center">
              <h4 className="font-semibold text-primary">{n.nombre}</h4>
              <p className="text-sm text-gray-500">{n.edad}</p>
              <p className="text-sm text-primary-light mt-2">{n.extra}</p>
              <p className="text-sm text-gray-500">{n.desc}</p>
              <p className="text-xs text-gray-400 mt-2">Horario: {n.horario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-gray-50 py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-bold text-primary-dark text-center mb-10">Roadmap del Proceso de Admisión</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {roadmap.map((r) => (
              <div key={r.n} className="bg-white rounded-lg p-5 text-center">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-3 font-bold">{r.n}</div>
                <h4 className="font-semibold text-primary-dark text-sm">{r.title}</h4>
                <p className="text-xs text-gray-500 mt-2">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requisitos */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h3 className="text-xl font-bold text-primary-dark text-center mb-8">Requisitos de Matrícula</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-6">
            <h4 className="font-semibold text-primary-dark mb-4">📋 Requisitos para Alumnos Nuevos</h4>
            <p className="text-xs uppercase text-gray-400 mb-2">Documentos Necesarios</p>
            <ul className="space-y-2">
              {requisitos.map((r, i) => (
                <li key={r} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 size={16} className="text-primary-light shrink-0" /> {i + 1}. {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="border rounded-lg p-6 space-y-4">
            <div>
              <p className="font-semibold text-primary-dark">📅 Fechas Clave</p>
              <p className="text-sm text-gray-500">• Inicio de inscripciones: Enero 2025</p>
              <p className="text-sm text-gray-500">• Fin de inscripciones: Marzo 2025</p>
              <p className="text-sm text-gray-500">• Inicio de clases: Marzo 2025</p>
            </div>
            <div>
              <p className="font-semibold text-primary-dark">🕐 Horarios de Atención</p>
              <p className="text-sm text-gray-500">• Lunes a Viernes: 8:00 AM - 3:00 PM</p>
              <p className="text-sm text-gray-500">• Sábados: 8:00 AM - 12:00 PM</p>
              <p className="text-sm text-gray-500">• Secretaría: Siempre disponible</p>
            </div>
            <div>
              <p className="font-semibold text-primary-dark">💡 Nota Importante</p>
              <p className="text-sm text-gray-500">Para alumnos nuevos es obligatorio presentar la vacante antes de iniciar el proceso de matrícula.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section className="bg-gray-50 py-14 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-xl font-bold text-primary-dark text-center mb-1">Formulario de Solicitud de Información</h3>
          <p className="text-center text-sm text-gray-500 mb-8">Completa este formulario y nos pondremos en contacto contigo</p>

          {sent && (
            <div className="bg-green-50 text-green-700 text-sm rounded-md p-3 mb-6 text-center">
              Se abrió tu cliente de correo con la solicitud lista para enviar. Si no se abrió, escríbenos directamente a mesadepartes1267@gmail.com.
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <input required name="estudiante" value={form.estudiante} onChange={handleChange} placeholder="Nombre completo del estudiante *" className="border rounded-md px-3 py-2 text-sm sm:col-span-2" />
            <input required type="date" name="nacimiento" value={form.nacimiento} onChange={handleChange} className="border rounded-md px-3 py-2 text-sm" />
            <select required name="nivel" value={form.nivel} onChange={handleChange} className="border rounded-md px-3 py-2 text-sm">
              <option value="">Selecciona el nivel</option>
              {grados.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            <input required name="apoderado" value={form.apoderado} onChange={handleChange} placeholder="Nombre del padre/madre/apoderado *" className="border rounded-md px-3 py-2 text-sm sm:col-span-2" />
            <input required name="dni" value={form.dni} onChange={handleChange} placeholder="DNI del apoderado *" className="border rounded-md px-3 py-2 text-sm" />
            <input required name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono de contacto *" className="border rounded-md px-3 py-2 text-sm" />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Correo electrónico" className="border rounded-md px-3 py-2 text-sm sm:col-span-2" />
            <input required name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección de domicilio *" className="border rounded-md px-3 py-2 text-sm sm:col-span-2" />
            <textarea name="comentarios" value={form.comentarios} onChange={handleChange} placeholder="Comentarios adicionales" rows={3} className="border rounded-md px-3 py-2 text-sm sm:col-span-2" />
            <button type="submit" className="sm:col-span-2 bg-primary text-white font-semibold py-3 rounded-md hover:bg-primary-light transition-colors">
              Enviar Solicitud de Información
            </button>
          </form>
        </div>
      </section>

      {/* Contacto rápido */}
      <section className="max-w-5xl mx-auto px-6 py-14 text-center">
        <h3 className="text-xl font-bold text-primary-dark mb-8">¿Necesitas más información?</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6">
            <Phone className="mx-auto text-primary-light mb-2" size={24} />
            <p className="font-semibold text-primary-dark">Llámanos</p>
            <p className="text-sm text-gray-600">(01) 123-4567</p>
            <p className="text-xs text-gray-400">Lun - Vie: 8:00 AM - 3:00 PM</p>
          </div>
          <div className="border rounded-lg p-6">
            <Mail className="mx-auto text-primary-light mb-2" size={24} />
            <p className="font-semibold text-primary-dark">Escríbenos</p>
            <p className="text-sm text-gray-600">mesadepartes1267@gmail.com</p>
            <p className="text-xs text-gray-400">Respuesta en 24 horas</p>
          </div>
          <div className="border rounded-lg p-6">
            <MapPin className="mx-auto text-primary-light mb-2" size={24} />
            <p className="font-semibold text-primary-dark">Visítanos</p>
            <p className="text-sm text-gray-600">ASOC. CASA HUERTA LA CAMPIÑA</p>
            <p className="text-xs text-gray-400">MZ O LT 2 - Lurigancho, Lima</p>
          </div>
        </div>
      </section>
    </div>
  )
}
