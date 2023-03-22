import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { login } from '../../../utils/dataManager';
import { OperationContext } from '../../../contexts/OperationContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import GmailPng from './gmail.png'
import { useParams, useNavigate } from 'react-router-dom';

const QRLoginPage = (props) => {
  const navigate = useNavigate();
  const { operationToken } = useParams();
  const { continuePath } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthToken, setOperationToken, setUserData, setModule, setRefreshAuthToken } = useContext(AuthContext);
  const { colorCode, colorCodeRGBA, logoPath } = useContext(OperationContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password, setAuthToken, setUserData, setModule, setOperationToken, setRefreshAuthToken);
  }

  console.log(operationToken);


  return (
    <section className="vh-100" style={{ background: `${colorCodeRGBA}` }}>
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <img src="https://my.wastreet.app/public/assets/img/logos/logo-wastreet.svg" className='mb-4' alt="Logo de Wastreet" style={{ height: '80px', margin: 'auto', display: 'block' }} />
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-4 text-center">

                <div className='mb-4'>
                  <h3 className="mb-4" style={{ fontWeight: 'bold' }}>
                    Bienvenue chez XXX
                  </h3>
                  <h5 className="mb-4" style={{ fontSize: '1.15rem' }}>
                    Vous souhaitez bénéficier de points de fidélité lors de votre commande ?
                  </h5>

                  <div className="form-outline mb-2">
                    <label className='form-label text-left fs-5'>Email</label>
                    <input type="email" placeholder="exemple@email.com" className='form-control-lg' required />
                  </div>

                  <div className="form-outline mb-2">
                    <label className='form-label text-left fs-5'>Mot de passe</label>
                    <input type="password" className='form-control-lg' placeholder="••••••••••••" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>

                  <button type="submit" className="btn btn-lg btn-primary w-100 mt-4 mb-2" style={{ background: colorCode, border: colorCode }} >
                    Connexion <small className="fa-solid fa-arrow-right ms-1"></small>
                  </button>

                  <button className="btn btn-lg btn-social btn-facebook w-100 text-center mb-2 align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '20px' }} /> Connexion via Facebook
                  </button>

                  <button className="btn btn-lg btn-outline-dark w-100 d-flex align-items-center justify-content-center">
                    <img src={GmailPng} style={{ height: '20px', width: '20px' }} className="me-2" /> Connexion via Gmail
                  </button>
                </div>

                {continuePath ?
                  (
                    <div>
                      <hr />

                      <button
                        className="btn btn-lg btn-primary w-100 mt-4 mb-2"
                        style={{ background: colorCode, border: colorCode }}
                        onClick={() => navigate("/" + operationToken + "/" + continuePath) }
                      >
                        Continuer sans se connecter
                      </button>

                      <p>Attention: En continuant sans vous connecter, vous ne bénéficierez pas de points de fidélité</p>
                    </div>
                  ) : (<></>)
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QRLoginPage;
