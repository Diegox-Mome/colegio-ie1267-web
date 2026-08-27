import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { Loader2, FileText, Phone } from 'lucide-react';
import NoticiasAdmin from './NoticiasAdmin';
import ContactoAdmin from './ContactoAdmin';

export default function Dashboard() {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('noticias');
  const navigate = useNavigate();

  useEffect(() => {
    async function checkSession() {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          navigate('/login');
          return;
        }

        const userId = session.user.id;
        
        // Verificar en web_admins_view
        const { data, error: viewError } = await supabase
          .from('web_admins_view')
          .select('user_id')
          .eq('user_id', userId)
          .single();

        if (viewError || !data) {
          await supabase.auth.signOut();
          navigate('/login', { state: { error: 'Acceso denegado' } });
          return;
        }

        setIsAdmin(true);
      } catch (err) {
        console.error("Error al verificar sesión:", err);
        await supabase.auth.signOut();
        navigate('/login', { state: { error: 'Acceso denegado' } });
      } finally {
        setLoadingAuth(false);
      }
    }

    checkSession();
  }, [navigate]);

  if (loadingAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Loader2 className="animate-spin text-primary-dark mb-4" size={48} />
        <p className="text-gray-500">Verificando credenciales...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-primary-dark mb-6">Panel de Administración</h1>
      
      <div className="bg-white border rounded-lg shadow-sm p-6 mb-8">
        <p className="text-gray-600 mb-6">
          Bienvenido al sistema de administración. Aquí podrás gestionar las noticias, eventos, admisiones y otros contenidos del colegio.
        </p>

        <div className="flex gap-4 border-b">
          <button 
            onClick={() => setActiveTab('noticias')}
            className={`py-2 px-4 font-semibold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'noticias' ? 'border-primary text-primary-dark' : 'border-transparent text-gray-500 hover:text-primary'}`}
          >
            <FileText size={18} /> Noticias
          </button>
          <button 
            onClick={() => setActiveTab('contacto')}
            className={`py-2 px-4 font-semibold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'contacto' ? 'border-primary text-primary-dark' : 'border-transparent text-gray-500 hover:text-primary'}`}
          >
            <Phone size={18} /> Contacto
          </button>
        </div>
      </div>

      {activeTab === 'noticias' && <NoticiasAdmin />}
      {activeTab === 'contacto' && <ContactoAdmin />}
      
    </div>
  );
}
