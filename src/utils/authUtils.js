import { supabase } from '../supabaseClient';

/**
 * Verifica si el usuario tiene rol de administrador (admin, administrator, superadmin, director)
 * verificando en:
 * 1. Tabla `profiles` (columna `role` y `is_active`)
 * 2. Tabla `user_roles` (columna `role`)
 * 3. Vista `web_admins_view` (compatibilidad previa)
 *
 * @param {string} userId - UUID del usuario en auth.users
 * @returns {Promise<boolean>}
 */
export async function checkAdminRole(userId) {
  if (!userId) return false;

  const validAdminRoles = ['admin', 'administrator', 'superadmin', 'director', 'directivo'];

  // 1. Verificar en public.profiles
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role, is_active')
      .eq('user_id', userId)
      .maybeSingle();

    if (!error && profile) {
      const roleStr = String(profile.role || '').toLowerCase().trim();
      const isAdmin = validAdminRoles.includes(roleStr);
      if (isAdmin && profile.is_active !== false) {
        return true;
      }
    }
  } catch (err) {
    console.warn('Advertencia verificando profiles:', err);
  }

  // 2. Verificar en public.user_roles
  try {
    const { data: userRoles, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);

    if (!error && userRoles && userRoles.length > 0) {
      const hasAdmin = userRoles.some((r) => {
        const roleStr = String(r.role || '').toLowerCase().trim();
        return validAdminRoles.includes(roleStr);
      });
      if (hasAdmin) return true;
    }
  } catch (err) {
    console.warn('Advertencia verificando user_roles:', err);
  }

  // 3. Verificar en vista web_admins_view (por compatibilidad previa)
  try {
    const { data: legacyView, error } = await supabase
      .from('web_admins_view')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (!error && legacyView && legacyView.user_id) {
      return true;
    }
  } catch (err) {
    console.warn('Advertencia verificando web_admins_view:', err);
  }

  return false;
}
