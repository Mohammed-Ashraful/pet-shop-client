import React, { createContext } from 'react';
import UseFirebase from '../../Hooks/UseFirebase/UseFirebase';

 export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  const allContext = UseFirebase();
  return (
    <AuthContext.Provider value={allContext}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;