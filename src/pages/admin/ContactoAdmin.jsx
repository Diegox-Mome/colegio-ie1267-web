import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Loader2, Save } from 'lucide-react';

export default function ContactoAdmin() {
  const [form, setForm] = useState({
    id: null,
    direccion: '',
    email: '',
    telefono: '',
    horarios: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchContacto();
  }, []);

  async function fetchContacto() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('web_contacto_info')
        .select('*')
        .limit(1);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setForm({
          id: data[0].id || null,
          direccion: data[0].direccion || '',
          email: data[0].email || '',
          telefono: data[0].telefono || '',
          horarios: data[0].horarios || data[0].horario || ''
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        direccion: form.direccion,
        email: form.email,
        telefono: form.telefono,
        horario: form.horarios, // Usando horario o horarios según la BD, probemos enviar ambos si es necesario.
        horarios: form.horarios
      };

      if (form.id) {
        payload.id = form.id;
      }

      const { data, error } = await supabase
        .from('web_contacto_info')
        .upsert([payload])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setForm({ ...form, id: data[0].id });
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white border rounded-lg shadow-sm p-6 mb-8 flex justify-center py-10">
        <Loader2 className="animate-spin text-primary-dark" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold text-primary-dark mb-4">Información de Contacto</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4 text-sm">
          Información guardada exitosamente.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
          <input
            type="text"
            name="direccion"
            className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-light outline-none"
            value={form.direccion}
            onChange={handleChange}
            placeholder="Ej. Av. Principal 123"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-light outline-none"
            value={form.email}
            onChange={handleChange}
            placeholder="correo@colegio.edu.pe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            type="text"
            name="telefono"
            className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-light outline-none"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Ej. 01 123 4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Horarios de Atención</label>
          <input
            type="text"
            name="horarios"
            className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-light outline-none"
            value={form.horarios}
            onChange={handleChange}
            placeholder="Ej. Lunes a Viernes 8:00am - 4:00pm"
          />
        </div>

        <button 
          type="submit" 
          disabled={saving}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 mt-4"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
}
