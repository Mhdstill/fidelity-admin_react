import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../contexts/AuthContext';

function Header(props) {
	const navigate = useNavigate();
    const { setAuthToken, setUserData, setOperationToken, setModule, authToken } = useContext(AuthContext);

	function handleLogout() {
		localStorage.removeItem('authToken');
		localStorage.removeItem('operationToken');
		localStorage.removeItem('userData');
		localStorage.removeItem('module');
		setAuthToken(null);
		setUserData(null);
		setOperationToken(null);
		setModule(null);
		navigate('/admin/login');
	  }
	  
  return (
    <nav className="navbar" id="navbar">
				<a href="#" className="nav-logo">
				<img src="https://my.wastreet.app/public/assets/img/logos/logo-wastreet.svg" alt="Logo de Wastreet" />
				</a>
				<div className="nav-content">
					<div className="nav-actions ms-auto">
						<div className="dropdown">
							<div className="dropdown">
								<button className="btn-avatar" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									<FontAwesomeIcon icon={faUser} />
								</button>
								<ul className="dropdown-menu dropdown-menu-end">
									<li className="px-2">
										<small className="text-muted">
											Connecté en tant que Justin Chazalette										</small>
									</li>
									<li className="dropdown-divider"></li>
									<li onClick={handleLogout}>
										<button type="button" className="dropdown-item">
										<FontAwesomeIcon icon={faSignOutAlt}/> Déconnexion
										</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<button type="button" className="nav-menu-btn fa-solid fa-bars" id="menuBtn" aria-label="Menu"></button>
		</nav>
  );
}

export default Header;
