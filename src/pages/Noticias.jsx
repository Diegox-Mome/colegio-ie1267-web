import { useEffect, useState, useMemo } from 'react'
import { Search, Tag, Calendar, Image as ImageIcon, TrendingUp, ChevronDown, LayoutGrid, ZoomIn, X } from 'lucide-react'
import { supabase } from '../supabaseClient'

const CATEGORIES = [
  'Todas', 'Académico', 'Comunicado', 'Infraestructura', 
  'Tecnología', 'Bienestar', 'Formación', 'Admisión'
]

export default function Noticias() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todas')
  const [zoomedImage, setZoomedImage] = useState(null)

  useEffect(() => {
    async function fetchNoticias() {
      try {
        const { data: noticiasData, error: supabaseError } = await supabase
          .from('web_noticias')
          .select('*')
          .order('id', { ascending: false })
        
        if (supabaseError) throw supabaseError
        
        setData(noticiasData || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNoticias()
  }, [])

  const filteredData = useMemo(() => {
    return data.filter(n => {
      const cat = n.categoria || 'Comunicado'; // Fallback for testing if missing
      const matchCategory = activeCategory === 'Todas' || cat === activeCategory;
      const term = searchQuery.toLowerCase();
      const matchSearch = term === '' || 
        (n.titulo && n.titulo.toLowerCase().includes(term)) || 
        (n.title && n.title.toLowerCase().includes(term)) ||
        (n.contenido && n.contenido.toLowerCase().includes(term)) ||
        (n.summary && n.summary.toLowerCase().includes(term)) ||
        (n.resumen && n.resumen.toLowerCase().includes(term));
      
      return matchCategory && matchSearch;
    });
  }, [data, searchQuery, activeCategory])

  return (
    <div className="min-h-screen bg-[#FAFCFC]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50/40 to-[#FAFCFC] pt-16 pb-14 px-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border border-blue-100 shadow-sm">
          <TrendingUp size={14} /> Mantente Informado
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D6246] mb-4">
          Noticias y Eventos
        </h1>
        <p className="text-gray-500 mb-10 max-w-xl mx-auto text-sm md:text-base">
          Descubre las últimas novedades, logros y actividades de nuestra institución educativa
        </p>

        <div className="relative w-full max-w-2xl mx-auto">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar noticias por título o contenido..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border-0 focus:outline-none focus:ring-2 focus:ring-[#0D6246]/20 transition-all text-sm text-gray-700 bg-white"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        
        {/* Filters and sorting */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-10">
          <div className="flex flex-wrap gap-2 lg:gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all ${
                  activeCategory === cat 
                  ? 'bg-[#0D6246] text-white shadow-md' 
                  : 'bg-white border-none shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat === 'Todas' ? <LayoutGrid size={15} /> : <Tag size={15} />}
                {cat}
              </button>
            ))}
          </div>


        </div>

        <p className="text-sm text-gray-500 mb-8 font-medium">
          Mostrando <span className="font-bold text-[#0D6246]">{filteredData.length}</span> noticias
        </p>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#0D6246]/20 border-t-[#0D6246] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-semibold">Cargando noticias...</p>
          </div>
        ) : error ? (
          <div className="py-16 px-6 text-red-500 bg-red-50 rounded-2xl text-center border border-red-100">
            <p className="font-semibold">Error al cargar las noticias:</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="max-w-lg mx-auto bg-white rounded-3xl py-16 px-6 text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center border border-gray-50 mt-8">
            <div className="mb-5 text-gray-400">
              <Search size={56} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-extrabold text-gray-800 mb-2">No se encontraron noticias</h3>
            <p className="text-sm text-gray-500">
              Intenta con otros términos de búsqueda o filtros
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((n, i) => (
              <div key={n.id || i} className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col border border-gray-50">
                <div className="aspect-[4/3] w-full bg-gray-100 relative overflow-hidden flex items-center justify-center">
                  {n.imagen_url && n.imagen_url.trim() !== '' ? (
                    <>
                      <img 
                        src={n.imagen_url} 
                        alt={n.titulo || n.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Overlay interactivo */}
                      <div 
                        className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer z-10"
                        onClick={() => setZoomedImage(n.imagen_url)}
                        title="Ver imagen completa"
                      >
                        <ZoomIn className="text-white w-12 h-12 opacity-90 drop-shadow-lg" strokeWidth={1.5} />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                      <ImageIcon size={48} strokeWidth={1.5} />
                    </div>
                  )}
                  {/* Categoría Badge flotante */}
                  {(n.categoria || activeCategory !== 'Todas') && (
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-[#0D6246] shadow-sm z-20">
                      {n.categoria || (activeCategory !== 'Todas' ? activeCategory : 'Comunicado')}
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-800 text-base mb-2 line-clamp-2 group-hover:text-[#0D6246] transition-colors">
                    {n.titulo || n.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">
                    {n.contenido || n.resumen || n.summary}
                  </p>
                  <div className="flex items-center text-xs text-gray-400 font-semibold mt-auto pt-4 border-t border-gray-50">
                    <Calendar size={13} className="mr-1.5" />
                    <span>{n.created_at ? new Date(n.created_at).toLocaleDateString('es-PE') : 'Reciente'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal de Zoom */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center pointer-events-none">
            <button 
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors pointer-events-auto shadow-sm"
              onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }}
              title="Cerrar"
            >
              <X size={24} />
            </button>
            <img 
              src={zoomedImage} 
              alt="Zoom" 
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}
