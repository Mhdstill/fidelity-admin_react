import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { login } from '../../../utils/dataManager';
import { OperationContext } from '../../../contexts/OperationContext';

const QRLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthToken, setOperationToken, setUserData, setModule, setRefreshAuthToken } = useContext(AuthContext);
  const { colorCode, logoPath } = useContext(OperationContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password, setAuthToken, setUserData, setModule, setOperationToken, setRefreshAuthToken);
  }

  return (
    <section className="vh-100" style={{ background: colorCode }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-4 text-center">


                <h3 className="mb-3" style={{ fontWeight: 'bold' }}>Bienvenue sur le site de livraison collaborative. </h3>
                <h5 className="mb-3" style={{ fontSize: '1.15rem' }}>Vous souhaitez demander une livraison ? <br />
                  Formulaire à remplir en quelques clics. </h5>

                <div className="mb-3 text-center">
                </div>

                <div className="form-outline mb-4">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QRLoginPage;
