import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';

export const DEFAULT_ADMISION_INFO = {
  id: 1,
  anio_escolar: '2025',
  estado_texto: 'Inscripciones abiertas hasta marzo',
  fecha_inicio_inscripcion: 'Enero 2025',
  fecha_fin_inscripcion: 'Marzo 2025',
  fecha_inicio_clases: 'Marzo 2025',
  horario_semana: 'Lunes a Viernes: 8:00 AM - 3:00 PM',
  horario_sabado: 'Sábados: 8:00 AM - 12:00 PM',
  horario_secretaria: 'Secretaría: Siempre disponible',
  nota_importante: 'Para alumnos nuevos es obligatorio presentar la vacante antes de iniciar el proceso de matrícula.',
  requisitos: [
    'Presentar vacante',
    'Actualización de datos',
    'DNI del apoderado',
    'DNI del estudiante',
    'Libreta de notas',
    'Pago de derechos de APAFA',
    'Otros'
  ]
};

const AdmisionContext = createContext({
  admisionInfo: DEFAULT_ADMISION_INFO,
  loadingAdmision: false,
  refreshAdmision: async () => {}
});

export function AdmisionProvider({ children }) {
  const [admisionInfo, setAdmisionInfo] = useState(DEFAULT_ADMISION_INFO);
  const [loadingAdmision, setLoadingAdmision] = useState(true);

  const fetchAdmisionInfo = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('web_admision_info')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (!error && data) {
        setAdmisionInfo({
          ...DEFAULT_ADMISION_INFO,
          ...data,
          requisitos: Array.isArray(data.requisitos) ? data.requisitos : DEFAULT_ADMISION_INFO.requisitos
        });
      }
    } catch (err) {
      console.warn('Usando configuración por defecto de admisión:', err);
    } finally {
      setLoadingAdmision(false);
    }
  }, []);

  useEffect(() => {
    fetchAdmisionInfo();
  }, [fetchAdmisionInfo]);

  return (
    <AdmisionContext.Provider value={{ admisionInfo, loadingAdmision, refreshAdmision: fetchAdmisionInfo }}>
      {children}
    </AdmisionContext.Provider>
  );
}

export function useAdmision() {
  return useContext(AdmisionContext);
}
