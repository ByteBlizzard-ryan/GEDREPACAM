import React, { createContext, useState, useContext } from 'react';
import axios from '../lib/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // L'utilisateur est nul par défaut et le chargement est terminé (false)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  /* 
   * APPEL API DÉSACTIVÉ : Pas besoin de vérifier la session au chargement 
   * car le site est accessible au public. Cela supprime l'erreur CORS.
   *
  useEffect(() => {
    axios.get('/api/user')
      .then(response => setUser(response.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);
  */

  const login = async (credentials) => {
    await axios.get('/sanctum/csrf-cookie');
    const response = await axios.post('/login', credentials);
    setUser(response.data.user);
  };

  const logout = async () => {
    await axios.post('/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);