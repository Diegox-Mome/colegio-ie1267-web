import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { Loader2, FileText, Phone, Users, BarChart, Mail, Building, LogOut, Settings } from 'lucide-react';
import NoticiasAdmin from './NoticiasAdmin';
import ContactoAdmin from './ContactoAdmin';
import EquipoAdmin from './EquipoAdmin';
import EstadisticasAdmin from './EstadisticasAdmin';
import BandejaAdmin from './BandejaAdmin';

export default function Dashboard() {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('bandeja');
  const [activeSubTab, setActiveSubTab] = useState('equipo');
  const navigate = useNavigate();

  useEffect(() => {
    async function checkSession() {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          navigate('/login');
          return;
        }

        const loginTime = localStorage.getItem('login_time');
        if (!loginTime || Date.now() - Number(loginTime) > 8 * 60 * 60 * 1000) {
          await supabase.auth.signOut();
          localStorage.removeItem('login_time');
          navigate('/login', { state: { error: 'Sesión expirada' } });
          return;
        }

        const userId = session.user.id;
        
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

  async function handleLogout() {
    await supabase.auth.signOut();
    localStorage.removeItem('login_time');
    navigate('/login');
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'bandeja':
        return <BandejaAdmin />;
      case 'noticias':
        return <NoticiasAdmin />;
      case 'contacto':
        return <ContactoAdmin />;
      case 'institucion':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-primary-dark mb-2 hidden md:block">Institución</h1>
            <div className="bg-white border rounded-lg shadow-sm p-4">
              <div className="flex gap-4 border-b overflow-x-auto">
                <button 
                  onClick={() => setActiveSubTab('equipo')}
                  className={`py-2 px-4 font-semibold whitespace-nowrap flex items-center gap-2 border-b-2 transition-colors ${activeSubTab === 'equipo' ? 'border-primary text-primary-dark' : 'border-transparent text-gray-500 hover:text-primary'}`}
                >
                  <Users size={18} /> Equipo Directivo
                </button>
                <button 
                  onClick={() => setActiveSubTab('estadisticas')}
                  className={`py-2 px-4 font-semibold whitespace-nowrap flex items-center gap-2 border-b-2 transition-colors ${activeSubTab === 'estadisticas' ? 'border-primary text-primary-dark' : 'border-transparent text-gray-500 hover:text-primary'}`}
                >
                  <BarChart size={18} /> Estadísticas Generales
                </button>
              </div>
            </div>
            {activeSubTab === 'equipo' && <EquipoAdmin />}
            {activeSubTab === 'estadisticas' && <EstadisticasAdmin />}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="w-64 bg-white border-r shadow-sm hidden md:flex flex-col shrink-0">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-primary-dark">Admin Panel</h2>
          <p className="text-xs text-gray-500 mt-1">IE 1267 Bicentenario</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('bandeja')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-md transition-colors ${activeTab === 'bandeja' ? 'bg-blue-50 text-primary-dark' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <Mail size={18} /> Bandeja de Entrada
          </button>
          <button 
            onClick={() => setActiveTab('noticias')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-md transition-colors ${activeTab === 'noticias' ? 'bg-blue-50 text-primary-dark' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <FileText size={18} /> Noticias
          </button>
          <button 
            onClick={() => setActiveTab('institucion')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-md transition-colors ${activeTab === 'institucion' ? 'bg-blue-50 text-primary-dark' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <Building size={18} /> Institución
          </button>
          <button 
            onClick={() => setActiveTab('contacto')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-md transition-colors ${activeTab === 'contacto' ? 'bg-blue-50 text-primary-dark' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <Settings size={18} /> Ajustes de Contacto
          </button>
        </nav>
        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto">
          {/* Mobile Nav */}
          <div className="md:hidden bg-white border rounded-lg shadow-sm p-4 mb-6">
            <h2 className="text-lg font-bold text-primary-dark mb-4">Admin Panel</h2>
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary-light outline-none bg-white mb-4"
            >
              <option value="bandeja">Bandeja de Entrada</option>
              <option value="noticias">Noticias</option>
              <option value="institucion">Institución</option>
              <option value="contacto">Ajustes de Contacto</option>
            </select>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 border border-red-200 rounded-md transition-colors"
            >
              <LogOut size={16} /> Cerrar Sesión
            </button>
          </div>
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
