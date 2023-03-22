import React, {useContext} from 'react';
import { OperationContext } from '../../contexts/OperationContext';
import ImgServer from '../ImgServer';

function QRHeader() {
	const { logoPath, colorCodeRGBA } = useContext(OperationContext)

	console.log(colorCodeRGBA);

	return (
		<nav id="navbar" style={{ background: colorCodeRGBA }} className="navbar d-flex align-items-center justify-content-between">
			<a href="#" className="nav-logo">
				<ImgServer path={logoPath} height='50px' />
			</a>
		</nav>
	);
}

export default QRHeader;