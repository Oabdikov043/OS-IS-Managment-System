
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { supabase } from '../utils/requests';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let requestId = 0;

    async function loadUser(session) {
      const currentRequest = ++requestId;

      if (!session?.user) {
        if (active && currentRequest === requestId) {
          setUser(null);
          setRole(null);
          setLoading(false);
        }
        return;
      }

      if (active) setLoading(true);

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (!active || currentRequest !== requestId) return;

      if (error) {
        console.error('Error loading user role:', error);
      }

      setUser(session.user);
      setRole(error ? null : data?.role ?? null);
      setLoading(false);
    }

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;

      if (error) console.error(error);
      loadUser(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Изпълняваме заявката извън auth callback.
      setTimeout(() => {
        if (active) loadUser(session);
      }, 0);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAdmin: role === 'admin',
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
