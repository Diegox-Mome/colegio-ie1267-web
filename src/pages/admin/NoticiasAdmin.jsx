import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Trash2, Loader2, Plus, Edit2, X } from 'lucide-react';

export default function NoticiasAdmin() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoria, setCategoria] = useState('Comunicado');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
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

      if (editingId) {
        const updateData = {
          titulo: title, 
          contenido: content,
          categoria: categoria
        };
        
        if (imagenUrl) {
          updateData.imagen_url = imagenUrl;
        }

        const { error } = await supabase
          .from('web_noticias')
          .update(updateData)
          .eq('id', editingId);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('web_noticias')
          .insert([{ 
            titulo: title, 
            contenido: content,
            categoria: categoria,
            imagen_url: imagenUrl
          }]); 
        
        if (error) throw error;
      }
      
      setEditingId(null);
      setTitle('');
      setContent('');
      setCategoria('Comunicado');
      setImageFile(null);
      setImagePreview(null);
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

  function handleEditClick(n) {
    setEditingId(n.id);
    setTitle(n.titulo || n.title || '');
    setContent(n.contenido || n.resumen || n.summary || '');
    setCategoria(n.categoria || 'Comunicado');
    setImageFile(null);
    setImagePreview(null);
    const fileInput = document.getElementById('imageInput');
    if (fileInput) fileInput.value = "";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold text-primary-dark mb-4">Gestión de Noticias</h2>
      <p className="text-sm text-slate-500 mb-6 bg-slate-50 p-3 rounded-lg border border-slate-100">
        Publica, edita o elimina los comunicados y eventos que se muestran en la pestaña pública de Noticias.
      </p>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleAdd} className="mb-8 bg-gray-50 p-4 rounded-md border">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          {editingId ? <Edit2 size={18} /> : <Plus size={18} />} {editingId ? 'Editar Noticia' : 'Agregar Nueva Noticia'}
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
            <label className="block text-sm font-medium text-gray-600 mb-2">Imagen de Portada (Opcional)</label>
            {imagePreview ? (
              <div className="relative inline-block">
                <img src={imagePreview} alt="Preview" className="rounded-xl object-cover h-32 w-48 border shadow-sm" />
                <button 
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                    const fileInput = document.getElementById('imageInput');
                    if (fileInput) fileInput.value = "";
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-md transition-colors"
                  title="Quitar imagen"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary-dark hover:file:bg-blue-100 bg-white border p-1 rounded-md transition-colors"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImageFile(file);
                  if (file) {
                    setImagePreview(URL.createObjectURL(file));
                  } else {
                    setImagePreview(null);
                  }
                }}
              />
            )}
          </div>
          <div className="flex gap-2">
            <button 
              type="submit" 
              disabled={adding}
              className="bg-primary text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {adding ? 'Guardando...' : (editingId ? 'Actualizar Noticia' : 'Guardar Noticia')}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={() => {
                  setEditingId(null);
                  setTitle('');
                  setContent('');
                  setCategoria('Comunicado');
                  setImageFile(null);
                  setImagePreview(null);
                  const fileInput = document.getElementById('imageInput');
                  if (fileInput) fileInput.value = "";
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            )}
          </div>
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
                {n.imagen_url && n.imagen_url.trim() !== '' ? (
                   <img 
                     src={n.imagen_url} 
                     alt="Portada" 
                     className="w-20 h-20 object-cover rounded-md shrink-0 border cursor-pointer hover:opacity-80 transition-opacity" 
                     onClick={() => setZoomedImage(n.imagen_url)}
                   />
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
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => handleEditClick(n)}
                    className="text-blue-500 hover:bg-blue-50 p-2 rounded-md transition-colors"
                    title="Editar noticia"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"
                    title="Eliminar noticia"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Zoom */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center pointer-events-none">
            <button 
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors pointer-events-auto"
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
  );
}
