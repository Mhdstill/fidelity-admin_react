import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../utils/dataManager';
import { AuthContext } from '../../contexts/AuthContext';

function Header() {
	const navigate = useNavigate();
	const { userData } = useContext(AuthContext)
	const user = JSON.parse(userData);

	return (
		<nav className="navbar" id="navbar">
			<a href="#" className="nav-logo">
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
										Connecté en tant que {user.email}
									</small>
								</li>
								<li className="dropdown-divider"></li>
								<li onClick={() => logout(navigate, "/admin")}>
									<button type="button" className="dropdown-item">
										<FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
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
