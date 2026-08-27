import { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import { MapPin, Mail, Clock, Facebook, MessageCircle, Phone, Loader2 } from 'lucide-react'
import { supabase } from '../supabaseClient'

const asuntos = [
  'Información de Admisión', 'Proceso de Matrícula', 'Consulta Académica', 'Sobre Infraestructura',
  'Niveles Educativos', 'Consulta General', 'Reclamo o Sugerencia',
]

export default function Contacto() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', asunto: '', mensaje: '' })
  
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchContactoInfo() {
      try {
        const { data, error: supabaseError } = await supabase
          .from('web_contacto_info')
          .select('*')
        
        if (supabaseError) throw supabaseError
        
        if (data && data.length > 0) {
          setInfo(data[0])
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchContactoInfo()
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const targetEmail = info?.email || 'mesadepartes1267@gmail.com'
    const subject = encodeURIComponent(`Contacto web: ${form.asunto || 'Consulta'}`)
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}\nTeléfono: ${form.telefono}\nEmail: ${form.email}\nAsunto: ${form.asunto}\n\nMensaje:\n${form.mensaje}`
    )
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div>
      <PageHeader
        title="Contacto"
        subtitle="Estamos aquí para atenderte. Contáctanos a través de cualquiera de nuestros canales de comunicación y te responderemos a la brevedad."
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-primary-dark mb-4" size={48} />
          <p className="text-gray-500">Cargando información de contacto...</p>
        </div>
      ) : error ? (
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="border border-red-200 bg-red-50 text-red-600 rounded-lg py-16 px-6">
            <p className="font-semibold text-lg">Error al cargar la información</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        </div>
      ) : (
        <>
          <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6">
              <MapPin className="text-primary-light mb-2" size={22} />
              <h3 className="font-semibold text-primary-dark">Dirección</h3>
              <p className="text-sm text-gray-600 mt-1">{info?.direccion || 'ASOC. CASA HUERTA LA CAMPIÑA, MZ O LT 2, Lurigancho, Lima, Perú'}</p>
              <p className="text-xs text-gray-400 mt-1">(frente a Serenazgo de La Campiña)</p>
            </div>
            <div className="border rounded-lg p-6">
              <Mail className="text-primary-light mb-2" size={22} />
              <h3 className="font-semibold text-primary-dark">Email</h3>
              <p className="text-sm text-gray-600 mt-1">{info?.email || 'mesadepartes1267@gmail.com'}</p>
              <p className="text-xs text-gray-400 mt-1">Mesa de Partes</p>
            </div>
            <div className="border rounded-lg p-6">
              <Clock className="text-primary-light mb-2" size={22} />
              <h3 className="font-semibold text-primary-dark">Horarios</h3>
              <p className="text-sm text-gray-600 mt-1">{info?.horarios || info?.horario || 'Lunes a viernes de 8:00 a 4:00 PM'}</p>
            </div>
          </section>

          {/* Formulario + mapa */}
          <section className="max-w-6xl mx-auto px-6 pb-14 grid md:grid-cols-2 gap-8">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-bold text-primary-dark mb-1">Envíanos un mensaje</h3>
              <p className="text-sm text-gray-500 mb-6">Completa el formulario y nos pondremos en contacto contigo</p>

              {sent && (
                <div className="bg-green-50 text-green-700 text-sm rounded-md p-3 mb-4 text-center">
                  Se abrió tu cliente de correo con el mensaje listo. Si no se abrió, escríbenos a {info?.email || 'mesadepartes1267@gmail.com'}.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input required name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre completo *" className="w-full border rounded-md px-3 py-2 text-sm" />
                <input required name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono *" className="w-full border rounded-md px-3 py-2 text-sm" />
                <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="Correo electrónico *" className="w-full border rounded-md px-3 py-2 text-sm" />
                <select required name="asunto" value={form.asunto} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm">
                  <option value="">Selecciona el tema de consulta</option>
                  {asuntos.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
                <textarea required name="mensaje" value={form.mensaje} onChange={handleChange} placeholder="Mensaje *" rows={4} className="w-full border rounded-md px-3 py-2 text-sm" />
                <button type="submit" className="w-full bg-primary text-white font-semibold py-3 rounded-md hover:bg-primary-light transition-colors">
                  Enviar Mensaje
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="border rounded-lg overflow-hidden h-64">
                <iframe
                  title="Ubicación del colegio"
                  className="w-full h-full"
                  loading="lazy"
                  src="https://www.google.com/maps?q=IE+1267+Bicentenario+La+Campiña+Lurigancho&output=embed"
                />
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold text-primary-dark mb-3">Síguenos</h3>
                <a href={info?.facebook || '#'} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-light mb-2">
                  <Facebook size={18} /> Facebook Institucional — Mantente al día con nuestras actividades
                </a>
                <p className="flex items-center gap-2 text-sm text-gray-400">
                  <MessageCircle size={18} /> WhatsApp Institucional — {info?.whatsapp || 'Próximamente disponible'}
                </p>
              </div>
              <div className="border rounded-lg p-6 text-sm text-gray-600 space-y-2">
                <p><span className="font-semibold text-primary-dark">Tiempo de respuesta:</span> Respondemos a todos los mensajes dentro de las 24 horas en días hábiles.</p>
                <p><span className="font-semibold text-primary-dark">Visitas:</span> Las visitas a las instalaciones se realizan con cita previa, de lunes a viernes.</p>
                <p><span className="font-semibold text-primary-dark">Emergencias:</span> Para situaciones urgentes, comunicarse directamente por teléfono.</p>
              </div>
            </div>
          </section>

          {/* Contactos por área */}
          <section className="bg-gray-50 py-14 px-6">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-primary-dark text-center mb-8">Contactos por Área</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-5">
                  <p className="text-xs uppercase text-gray-400">Dirección General</p>
                  <p className="font-semibold text-primary-dark mt-1">Mg. Oscar Eulogio Vargas Rodríguez</p>
                  <p className="text-sm text-gray-500">Consultas generales y reuniones con dirección</p>
                </div>
                <div className="bg-white rounded-lg p-5">
                  <p className="text-xs uppercase text-gray-400">Subdirección General</p>
                  <p className="font-semibold text-primary-dark mt-1">Ana Karina Delgado Bolivar</p>
                  <p className="text-sm text-gray-500 mb-2">Subdirectora de Secundaria</p>
                  <p className="font-semibold text-primary-dark">Margarita Ynca Maldonado</p>
                  <p className="text-sm text-gray-500 mb-2">Subdirectora de Secundaria</p>
                  <p className="font-semibold text-primary-dark">Cecilia Bertha Navarro Dávalos</p>
                  <p className="text-sm text-gray-500">Subdirectora de Primaria e Inicial</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA final */}
          <section className="max-w-4xl mx-auto px-6 py-14 text-center">
            <h3 className="text-xl font-bold text-primary-dark mb-2">¿Tienes alguna pregunta?</h3>
            <p className="text-gray-500 mb-6">Nuestro equipo está siempre disponible para brindarte la información que necesites sobre nuestra institución educativa.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`tel:${info?.telefono || '0112345670'}`} className="bg-primary text-white px-6 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-primary-light">
                <Phone size={18} /> Llamar Ahora
              </a>
              <a href={`mailto:${info?.email || 'mesadepartes1267@gmail.com'}`} className="border border-primary text-primary px-6 py-3 rounded-md font-semibold flex items-center gap-2 hover:bg-blue-50">
                <Mail size={18} /> Escribir Email
              </a>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
