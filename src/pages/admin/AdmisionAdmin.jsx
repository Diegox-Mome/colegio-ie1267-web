import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useAdmision, DEFAULT_ADMISION_INFO } from '../../context/AdmisionContext';
import { Loader2, Save, Plus, Trash2, Calendar, Clock, AlertCircle, ListChecks } from 'lucide-react';

export default function AdmisionAdmin() {
  const { admisionInfo, refreshAdmision } = useAdmision();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState(DEFAULT_ADMISION_INFO);
  const [nuevoRequisito, setNuevoRequisito] = useState('');

  useEffect(() => {
    if (admisionInfo) {
      setForm(admisionInfo);
    }
  }, [admisionInfo]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAddRequisito(e) {
    e.preventDefault();
    if (!nuevoRequisito.trim()) return;
    setForm({
      ...form,
      requisitos: [...(form.requisitos || []), nuevoRequisito.trim()]
    });
    setNuevoRequisito('');
  }

  function handleRemoveRequisito(index) {
    const updated = (form.requisitos || []).filter((_, i) => i !== index);
    setForm({ ...form, requisitos: updated });
  }

  function handleRequisitoChange(index, value) {
    const updated = [...(form.requisitos || [])];
    updated[index] = value;
    setForm({ ...form, requisitos: updated });
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        id: 1,
        anio_escolar: form.anio_escolar || '2025',
        estado_texto: form.estado_texto || '',
        fecha_inicio_inscripcion: form.fecha_inicio_inscripcion || '',
        fecha_fin_inscripcion: form.fecha_fin_inscripcion || '',
        fecha_inicio_clases: form.fecha_inicio_clases || '',
        horario_semana: form.horario_semana || '',
        horario_sabado: form.horario_sabado || '',
        horario_secretaria: form.horario_secretaria || '',
        nota_importante: form.nota_importante || '',
        requisitos: form.requisitos || [],
        updated_at: new Date().toISOString()
      };

      const { error: upsertError } = await supabase
        .from('web_admision_info')
        .upsert([payload]);

      if (upsertError) throw upsertError;

      await refreshAdmision();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
    } catch (err) {
      setError(err.message || 'Error al guardar los cambios en la base de datos.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 mb-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-primary-dark">Admisión y Proceso de Matrícula</h2>
          <p className="text-sm text-slate-500 mt-1">
            Configura el año escolar, fechas clave, horarios de atención, notas y requisitos de admisión para toda la web.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 text-sm flex items-center gap-2">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-700 p-3 rounded-md mb-6 text-sm font-medium">
          ✓ Configuración de admisión y matrícula guardada exitosamente. Se ha actualizado en toda la web.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* 1. Año Escolar y Estado */}
        <div className="bg-slate-50/80 p-5 rounded-lg border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold border-b border-slate-200 pb-2">
            <Calendar size={18} />
            <h3>Año Escolar y Encabezado</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Año Escolar de Admisión *
              </label>
              <input
                type="text"
                required
                name="anio_escolar"
                value={form.anio_escolar || ''}
                onChange={handleChange}
                placeholder="Ej. 2025"
                className="w-full border rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary-light outline-none"
              />
              <p className="text-[11px] text-gray-400 mt-1">Modifica este año para actualizar botones y títulos (Navbar, Inicio, Admisión).</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Texto de Estado / Convocatoria
              </label>
              <input
                type="text"
                name="estado_texto"
                value={form.estado_texto || ''}
                onChange={handleChange}
                placeholder="Ej. Inscripciones abiertas hasta marzo 2025"
                className="w-full border rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary-light outline-none"
              />
              <p className="text-[11px] text-gray-400 mt-1">Etiqueta destacada en la cabecera de la página de admisión.</p>
            </div>
          </div>
        </div>

        {/* 2. Fechas Clave */}
        <div className="bg-slate-50/80 p-5 rounded-lg border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold border-b border-slate-200 pb-2">
            <Calendar size={18} />
            <h3>Fechas Clave de Matrícula</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Inicio de inscripciones
              </label>
              <input
                type="text"
                name="fecha_inicio_inscripcion"
                value={form.fecha_inicio_inscripcion || ''}
                onChange={handleChange}
                placeholder="Ej. Enero 2025"
                className="w-full border rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary-light outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Fin de inscripciones
              </label>
              <input
                type="text"
                name="fecha_fin_inscripcion"
                value={form.fecha_fin_inscripcion || ''}
                onChange={handleChange}
                placeholder="Ej. Marzo 2025"
                className="w-full border rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary-light outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Inicio de clases
              </label>
              <input
                type="text"
                name="fecha_inicio_clases"
                value={form.fecha_inicio_clases || ''}
                onChange={handleChange}
                placeholder="Ej. Marzo 2025"
                className="w-full border rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary-light outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3. Horarios de Atención */}
        <div className="bg-slate-50/80 p-5 rounded-lg border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold border-b border-slate-200 pb-2">
            <Clock size={18} />
            <h3>Horarios de Atención</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Lunes a Viernes
              </label>
              <input
                type="text"
                name="horario_semana"
                value={form.horario_semana || ''}
                onChange={handleChange}
                placeholder="Ej. 8:00 AM - 3:00 PM"
                className="w-full border rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary-light outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Sábados
              </label>
              <input
                type="text"
                name="horario_sabado"
                value={form.horario_sabado || ''}
                onChange={handleChange}
                placeholder="Ej. 8:00 AM - 12:00 PM"
                className="w-full border rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary-light outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Secretaría
              </label>
              <input
                type="text"
                name="horario_secretaria"
                value={form.horario_secretaria || ''}
                onChange={handleChange}
                placeholder="Ej. Siempre disponible"
                className="w-full border rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary-light outline-none"
              />
            </div>
          </div>
        </div>

        {/* 4. Nota Importante */}
        <div className="bg-slate-50/80 p-5 rounded-lg border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold border-b border-slate-200 pb-2">
            <AlertCircle size={18} />
            <h3>Nota Importante</h3>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Contenido del aviso para postulantes
            </label>
            <textarea
              name="nota_importante"
              rows={3}
              value={form.nota_importante || ''}
              onChange={handleChange}
              placeholder="Ej. Para alumnos nuevos es obligatorio presentar la vacante antes de iniciar el proceso de matrícula."
              className="w-full border rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-primary-light outline-none"
            />
          </div>
        </div>

        {/* 5. Requisitos para Alumnos Nuevos */}
        <div className="bg-slate-50/80 p-5 rounded-lg border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold border-b border-slate-200 pb-2">
            <ListChecks size={18} />
            <h3>Requisitos de Matrícula (Alumnos Nuevos)</h3>
          </div>
          
          <div className="space-y-2.5">
            {(form.requisitos || []).map((req, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 w-5">{idx + 1}.</span>
                <input
                  type="text"
                  value={req}
                  onChange={(e) => handleRequisitoChange(idx, e.target.value)}
                  className="flex-1 border rounded-md px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-primary-light outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveRequisito(idx)}
                  className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded"
                  title="Eliminar requisito"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Agregar nuevo requisito */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={nuevoRequisito}
              onChange={(e) => setNuevoRequisito(e.target.value)}
              placeholder="Escribir nuevo documento o requisito..."
              className="flex-1 border rounded-md px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-primary-light outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddRequisito(e);
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddRequisito}
              className="flex items-center gap-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold px-3 py-2 rounded-md transition"
            >
              <Plus size={15} />
              <span>Añadir</span>
            </button>
          </div>
        </div>

        {/* Botón de guardar */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-primary text-white font-semibold px-6 py-2.5 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 shadow-sm text-sm"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            <span>{saving ? 'Guardando cambios...' : 'Guardar Todo'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
