import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Loader2, Trash2, CheckCircle, Mail, MailOpen } from 'lucide-react';

export default function BandejaAdmin() {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMensajes();
  }, []);

  async function fetchMensajes() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('web_mensajes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setMensajes(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleMarcarLeido(id) {
    try {
      const { error } = await supabase
        .from('web_mensajes')
        .update({ leido: true })
        .eq('id', id);
        
      if (error) throw error;
      setMensajes(mensajes.map(m => m.id === id ? { ...m, leido: true } : m));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('¿Seguro que deseas eliminar este mensaje?')) return;
    try {
      const { error } = await supabase
        .from('web_mensajes')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      setMensajes(mensajes.filter(m => m.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold text-primary-dark mb-4">Bandeja de Entrada</h2>
      <p className="text-sm text-slate-500 mb-6 bg-slate-50 p-3 rounded-lg border border-slate-100">
        Lee y gestiona los mensajes enviados por los usuarios desde los formularios públicos de Contacto y Admisión.
      </p>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}

      <div>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-gray-400" />
          </div>
        ) : mensajes.length === 0 ? (
          <p className="text-gray-500 text-sm">No hay mensajes en la bandeja.</p>
        ) : (
          <div className="grid gap-4">
            {mensajes.map((m) => (
              <div 
                key={m.id} 
                className={`border p-4 rounded-md transition-colors ${!m.leido ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'}`}
              >
                <div className="flex justify-between items-start mb-2 gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full uppercase tracking-wide ${m.tipo === 'Admisión' || m.tipo === 'Admision' ? 'bg-accent-red' : 'bg-primary-dark'}`}>
                      {m.tipo}
                    </span>
                    <h4 className={`text-base ${!m.leido ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                      {m.asunto}
                    </h4>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                    {new Date(m.created_at).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-800">{m.nombre}</p>
                  <p className="text-xs text-gray-500">
                    {m.email && <span>Email: {m.email} | </span>}
                    {m.telefono && <span>Tel: {m.telefono}</span>}
                  </p>
                </div>
                
                <div className="bg-white/60 p-3 rounded text-sm text-gray-700 whitespace-pre-wrap border border-black/5 mb-3">
                  {m.mensaje}
                </div>
                
                <div className="flex justify-end gap-2">
                  {!m.leido && (
                    <button
                      onClick={() => handleMarcarLeido(m.id)}
                      className="text-primary hover:bg-blue-100 bg-blue-50/50 p-2 rounded-md transition-colors text-xs font-semibold flex items-center gap-1 border border-primary/20"
                      title="Marcar como leído"
                    >
                      <CheckCircle size={14} /> Marcar como Leído
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors flex items-center justify-center border border-transparent hover:border-red-100"
                    title="Eliminar mensaje"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
