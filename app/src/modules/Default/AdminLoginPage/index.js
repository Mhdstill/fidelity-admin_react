import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { login } from '../../../utils/dataManager';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authToken, setAuthToken, setRefreshAuthToken, setOperationToken, setUserData, setModule } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password, setAuthToken, setUserData, setModule, setOperationToken, setRefreshAuthToken);
  }

  useEffect(() => {
    if (authToken) {
      navigate('/admin');
    }
  }, [authToken, navigate]);

  return (

    <form onSubmit={handleLogin}>
      <section className="vh-100" style={{ background: 'rgb(235, 237, 244)' }}>
        <div className="container py-3 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                <div className='d-flex align-items-center justify-content-between p-3'>
                  <img src="https://my.wastreet.app/public/assets/img/logos/logo-wastreet.svg" className='mb-2 d-block' alt="Logo de Wastreet" style={{ height: '40px', margin: 'auto', display: 'block' }} />
                </div>
                <div className="card-body p-4 pt-0 text-center">
                  <div className='mb-2'>
                    <div className="form-outline mb-4 text-left">
                      <label className='form-label text-left font-weight-bold'>Email</label>
                      <input type="email" id="email" placeholder="exemple@email.com" className='form-control form-control' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="form-outline mb-2 text-left">
                      <label className='form-label text-left font-weight-bold'>Mot de passe</label>
                      <input type="password" className='form-control' id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-4 mb-2 fs-5 font-weight-bold">
                      Connexion <small className="fa-solid fa-arrow-right ms-1"></small>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>


  );
}

export default AdminLoginPage;

{/* 
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
    */}
