import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Trash2, Loader2, Plus } from 'lucide-react';

export default function NoticiasAdmin() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoria, setCategoria] = useState('Comunicado');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNoticias();
  }, []);

  async function fetchNoticias() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('web_noticias')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) throw error;
      setNoticias(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    setError(null);
    setAdding(true);
    try {
      let imagenUrl = null;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `noticias/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('web_public')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('web_public')
          .getPublicUrl(filePath);

        imagenUrl = publicUrlData.publicUrl;
      }

      const { error } = await supabase
        .from('web_noticias')
        .insert([{ 
          titulo: title, 
          contenido: content,
          categoria: categoria,
          imagen_url: imagenUrl
        }]); 
      
      if (error) throw error;
      
      setTitle('');
      setContent('');
      setCategoria('Comunicado');
      setImageFile(null);
      const fileInput = document.getElementById('imageInput');
      if (fileInput) fileInput.value = "";

      fetchNoticias();
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('¿Seguro que deseas eliminar esta noticia?')) return;
    try {
      const { error } = await supabase
        .from('web_noticias')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      fetchNoticias();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold text-primary-dark mb-4">Gestión de Noticias</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleAdd} className="mb-8 bg-gray-50 p-4 rounded-md border">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Plus size={18} /> Agregar Nueva Noticia
        </h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Título</label>
              <input
                type="text"
                required
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-light outline-none bg-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Inicio de clases 2024"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Categoría</label>
              <select
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-light outline-none bg-white"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="Académico">Académico</option>
                <option value="Comunicado">Comunicado</option>
                <option value="Infraestructura">Infraestructura</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Bienestar">Bienestar</option>
                <option value="Formación">Formación</option>
                <option value="Admisión">Admisión</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Contenido / Resumen</label>
            <textarea
              required
              rows={3}
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-light outline-none bg-white"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Detalles de la noticia..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Imagen de Portada (Opcional)</label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary-dark hover:file:bg-blue-100 bg-white border p-1 rounded-md"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
          <button 
            type="submit" 
            disabled={adding}
            className="bg-primary text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {adding ? 'Guardando...' : 'Guardar Noticia'}
          </button>
        </div>
      </form>

      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Noticias Publicadas</h3>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-gray-400" />
          </div>
        ) : noticias.length === 0 ? (
          <p className="text-gray-500 text-sm">No hay noticias registradas.</p>
        ) : (
          <div className="space-y-3">
            {noticias.map((n) => (
              <div key={n.id} className="flex gap-4 items-start border p-3 rounded-md hover:bg-gray-50 transition-colors">
                {n.imagen_url ? (
                   <img src={n.imagen_url} alt="Portada" className="w-20 h-20 object-cover rounded-md shrink-0 border" />
                ) : (
                   <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center shrink-0 border">
                     <span className="text-xs text-gray-400">Sin foto</span>
                   </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-white bg-primary-dark px-2 py-0.5 rounded-full uppercase tracking-wide">
                      {n.categoria || 'Sin Categoría'}
                    </span>
                    <h4 className="font-semibold text-primary-dark truncate">{n.titulo || n.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{n.contenido || n.resumen || n.summary}</p>
                </div>
                <button
                  onClick={() => handleDelete(n.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors shrink-0"
                  title="Eliminar noticia"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
