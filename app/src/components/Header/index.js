import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Header(props) {
  return (
    <nav class="navbar" id="navbar">
				<a href="#" class="nav-logo">
				<img src="https://my.wastreet.app/public/assets/img/logos/logo-wastreet.svg" alt="Logo de Wastreet" />
				</a>
				<div class="nav-content">
					<div class="nav-actions ms-auto">
						<select id="id_shift_structure" class="me-lg-4">
							<option value="1">GPSO - Collectes</option><option value="2">GPSO - PU</option><option value="3">Ville de Paris</option><option value="4" selected="">DEMO</option><option value="6">SNA</option><option value="8">SIRMOTOM</option><option value="12">NOISY Le Grand</option>						</select>
						<div class="dropdown">
							<div class="dropdown">
								<button class="btn-avatar" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									<FontAwesomeIcon icon={faUser} />
								</button>
								<ul class="dropdown-menu dropdown-menu-end">
									<li class="px-2">
										<small class="text-muted">
											Connecté en tant que Justin Chazalette										</small>
									</li>
									<li class="dropdown-divider"></li>
									<li>
										<button type="button" class="dropdown-item">
										<FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
										</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<button type="button" class="nav-menu-btn fa-solid fa-bars" id="menuBtn" aria-label="Menu"></button>
		</nav>
  );
}

export default Header;
