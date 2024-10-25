import './Header.scss';
import { ReactComponent as Ducky } from '../assets/ducky.svg';

const Header = () => {
	return (
		<header className="header">
			<h1 className='header__title'><Ducky /></h1>
		</header>
	);
}

export default Header;
