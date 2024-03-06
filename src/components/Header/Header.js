import { NavLink } from 'react-router-dom';
import './Header.scss'

const Header = () => {
  return (
    <div className="header">
      <nav className="header__menu">
				<NavLink to={'/'} className="header__link" end style={({isActive}) => ({color: isActive ? '#9F0013' : '#232222'})}>Shop</NavLink>
        <NavLink to={'cart'} className="header__link" style={({isActive}) => ({color: isActive ? '#9F0013' : '#232222'})}>Cart</NavLink>
      </nav>
    </div>
  )
}

export default Header;