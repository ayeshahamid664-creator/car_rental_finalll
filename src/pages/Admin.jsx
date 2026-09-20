import React, { useState, useEffect } from 'react';
import AdminPanel from '../components/Admin/AdminPanel';
import AdminLogin from '../components/Admin/AdminLogin';

const Admin = ({ theme }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Page load pe session check karo
  useEffect(() => {
    const auth = sessionStorage.getItem('admin-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <AdminLogin theme={theme} onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminPanel theme={theme} />;
};

export default Admin;