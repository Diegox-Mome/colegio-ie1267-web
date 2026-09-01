import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Trash2, Loader2, Plus, Edit2, Users, AlertCircle, X } from 'lucide-react';

const SECCIONES = [
  'Dirección General',
  'Subdirección General',
  'Coordinación de Inicial',
  'Coordinación de Primaria',
  'Coordinación de Secundaria'
];

// LÓGICA SALVAVIDAS RESTAURADA PARA RECUPERAR TUS PROFES ANTIGUOS
function getSafeSeccion(miembro) {
  if (SECCIONES.includes(miembro.seccion)) return miembro.seccion;
  if (miembro.seccion === 'Equipo Directivo') return 'Dirección General';

  const c = (miembro.cargo || '').toLowerCase();
  if (c.includes('director general') || c.includes('directora')) return 'Dirección General';
  if (c.includes('subdirector') || c.includes('subdirección')) return 'Subdirección General';
  if (c.includes('inicial')) return 'Coordinación de Inicial';
  if (c.includes('grado') || c.includes('primaria')) return 'Coordinación de Primaria';

  return 'Coordinación de Secundaria';
}

export default function EquipoAdmin() {
  const [equipo, setEquipo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState('');
  const [seccion, setSeccion] = useState('Dirección General');
  const [orden, setOrden] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEquipo();
  }, []);

  async function fetchEquipo() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('web_equipo')
        .select('*');

      if (error) throw error;
      setEquipo(data || []);
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
      const payload = {
        nombre,
        cargo,
        seccion,
        orden: Number(orden) || 0
      };

      if (editingId) {
        const { error } = await supabase
          .from('web_equipo')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('web_equipo')
          .insert([payload]);
        if (error) throw error;
      }

      resetForm();
      fetchEquipo();
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('¿Seguro que deseas eliminar este miembro?')) return;
    try {
      const { error } = await supabase
        .from('web_equipo')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchEquipo();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleEditClick(miembro) {
    setEditingId(miembro.id);
    setNombre(miembro.nombre || '');
    setCargo(miembro.cargo || '');
    setSeccion(getSafeSeccion(miembro));
    setOrden(miembro.orden || 0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setEditingId(null);
    setNombre('');
    setCargo('');
    setSeccion('Dirección General');
    setOrden(0);
  }

  return (
    <div className="bg-white border rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Users size={24} />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Gestión de Personal</h2>
      </div>
      <p className="text-sm text-slate-500 mb-6 bg-slate-50 p-3 rounded-lg border border-slate-100">
        Gestiona a los directivos y coordinadores que aparecen ordenados por jerarquía en la página de Nosotros.
      </p>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 text-sm border border-red-100 flex gap-2 items-start">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <div>
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* FORMULARIO */}
      <form onSubmit={handleAdd} className="mb-10 bg-slate-50 p-6 rounded-xl border border-slate-100">
        <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
          {editingId ? <Edit2 size={18} className="text-blue-500" /> : <Plus size={18} className="text-green-500" />}
          {editingId ? 'Editar Registro' : 'Nuevo Registro'}
        </h3>

        <div className="space-y-5 max-w-3xl">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Nombre Completo</label>
              <input
                type="text"
                required
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-shadow"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Mg. Juan Pérez..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Cargo Específico</label>
              <input
                type="text"
                required
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-shadow"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                placeholder="Ej. Coord. de Matemática"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">División</label>
              <select
                required
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-shadow"
                value={seccion}
                onChange={(e) => setSeccion(e.target.value)}
              >
                {SECCIONES.map(sec => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Orden de prioridad</label>
              <p className="text-[11px] text-slate-400 mb-1">1 = Máxima prioridad (sale primero), 0 = Sale al final</p>
              <input
                type="number"
                min="0"
                required
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-shadow"
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={adding}
              className="bg-slate-800 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-900 transition-colors disabled:opacity-50"
            >
              {adding ? 'Guardando...' : (editingId ? 'Actualizar Registro' : 'Guardar Registro')}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <X size={16} /> Cancelar
              </button>
            )}
          </div>
        </div>
      </form>

      {/* LISTA RENDERIZADA */}
      <div>
        <h3 className="font-bold text-slate-800 mb-6 text-lg border-b pb-2">Personal Registrado</h3>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-slate-400 w-8 h-8" />
          </div>
        ) : equipo.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <p className="text-slate-500 text-sm">No hay personal registrado aún.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {SECCIONES.map((division) => {
              const members = equipo
                .filter(m => getSafeSeccion(m) === division)
                .sort((a, b) => {
                  const ordenA = a.orden || 0;
                  const ordenB = b.orden || 0;
                  if (ordenA === 0 && ordenB !== 0) return 1;
                  if (ordenB === 0 && ordenA !== 0) return -1;
                  return ordenA - ordenB;
                });

              if (members.length === 0) return null;

              return (
                <div key={division} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                    <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wide">{division}</h4>
                    <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                      {members.length}
                    </span>
                  </div>

                  <div className="bg-white divide-y divide-slate-100">
                    {members.map((m) => (
                      <div key={m.id} className="flex justify-between items-center p-4 hover:bg-slate-50 transition-colors">
                        <div>
                          <h4 className="font-bold text-slate-800 text-[15px]">{m.nombre}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-slate-500 font-medium">{m.cargo}</span>
                            <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100">
                              Prioridad: {m.orden || 0}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditClick(m)}
                            className="text-blue-600 hover:bg-blue-100 p-2 rounded-md transition-colors flex items-center justify-center"
                            title="Editar"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(m.id)}
                            className="text-red-500 hover:bg-red-100 p-2 rounded-md transition-colors flex items-center justify-center"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}