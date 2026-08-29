import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Loader2, Save } from 'lucide-react';

export default function EstadisticasAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [estudiantes, setEstudiantes] = useState('');
  const [docentes, setDocentes] = useState('');
  const [aulas, setAulas] = useState('');
  const [aniosHistoria, setAniosHistoria] = useState('');

  useEffect(() => {
    fetchEstadisticas();
  }, []);

  async function fetchEstadisticas() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('web_estadisticas')
        .select('*')
        .eq('id', 1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error; // PGRST116 is not found
      
      if (data) {
        setEstudiantes(data.estudiantes || '');
        setDocentes(data.docentes || '');
        setAulas(data.aulas || '');
        setAniosHistoria(data.anios_historia || '');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await supabase
        .from('web_estadisticas')
        .upsert({
          id: 1, // Using a fixed ID for single row stats
          estudiantes: estudiantes,
          docentes: docentes,
          aulas: aulas,
          anios_historia: aniosHistoria
        });

      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold text-primary-dark mb-4">Gestión de Estadísticas</h2>
      <p className="text-sm text-slate-500 mb-6 bg-slate-50 p-3 rounded-lg border border-slate-100">
        Actualiza las cifras de estudiantes, aulas y docentes. Estos cambios se reflejarán automáticamente en las páginas de Inicio, Nosotros e Infraestructura.
      </p>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4 text-sm">
          Estadísticas guardadas correctamente.
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin text-gray-400" />
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-4 max-w-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Estudiantes</label>
              <input
                type="text"
                required
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-light outline-none"
                value={estudiantes}
                onChange={(e) => setEstudiantes(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Docentes</label>
              <input
                type="text"
                required
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-light outline-none"
                value={docentes}
                onChange={(e) => setDocentes(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Aulas</label>
              <input
                type="text"
                required
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-light outline-none"
                value={aulas}
                onChange={(e) => setAulas(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Años de Historia</label>
              <input
                type="text"
                required
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-light outline-none"
                value={aniosHistoria}
                onChange={(e) => setAniosHistoria(e.target.value)}
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={saving}
            className="bg-primary text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Guardando...' : 'Guardar Estadísticas'}
          </button>
        </form>
      )}
    </div>
  );
}
