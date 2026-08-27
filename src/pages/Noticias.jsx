import PageHeader from '../components/PageHeader'
import { Newspaper } from 'lucide-react'

export default function Noticias() {
  // TODO: cuando tengan un backend propio (o una hoja de cálculo/CMS), reemplazar
  // este arreglo vacío con la carga real de noticias.
  const noticias = []

  return (
    <div>
      <PageHeader title="Noticias y Eventos" subtitle="Mantente al día con las últimas novedades de nuestra institución educativa." />

      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        {noticias.length === 0 ? (
          <div className="border border-dashed rounded-lg py-16 px-6">
            <Newspaper className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="font-semibold text-gray-500 text-lg">No se encontraron noticias</h3>
            <p className="text-sm text-gray-400 mt-2">
              Muy pronto publicaremos aquí las últimas novedades de nuestra institución.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {noticias.map((n) => (
              <div key={n.title} className="border rounded-lg p-5">
                <h3 className="font-semibold text-primary-dark">{n.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{n.summary}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
