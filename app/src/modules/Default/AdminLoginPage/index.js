import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authToken, setAuthToken, setRefreshAuthToken, setOperationToken, setUserData, setModule } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await fetch('https://mhd-it.fr/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      const { token, role, email: userEmail, module, operation, refresh_token } = data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('operationToken', operation);
      localStorage.setItem('userData', JSON.stringify({ email: userEmail, role: role }));
      localStorage.setItem('module', module);
      localStorage.setItem('refreshAuthToken', refresh_token);
      setAuthToken(token);
      setUserData(JSON.stringify({ email: userEmail, role: role }));
      setModule(module);
      setOperationToken(operation);
      setRefreshAuthToken(refresh_token);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (authToken) {
      navigate('/');
    }
  }, [authToken, navigate]);

  return (
    <form onSubmit={handleLogin}>
      <div style={{ background: '#f6f6f6' }}>
        <div className="auth-wrapper">
          <div className="connexion_content">
            <img src="https://my.wastreet.app/public/assets/img/logos/logo-wastreet.svg" alt="Logo de Wastreet" />
            <div className="block">
              <div className="block-header">
                <h2>Connexion</h2>
              </div>
              <div className="block-body" data-dashlane-rid="42cfd1833e627ff0" data-form-type="login">
                <label htmlFor="id_login">Identifiant</label>
                <input type="email" id="email" placeholder="exemple@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="id_password">Mot de passe</label>
                <input type="password" placeholder="••••••••••••" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="btn btn-primary w-100 mt-4">
                  Connexion <small className="fa-solid fa-arrow-right ms-1"></small>
                </button>
              </div>
            </div>
            <p className="text-center mt-3">
              Mot de passe oublié ? <a href="#new_password">Réinitialiser</a>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AdminLoginPage;
