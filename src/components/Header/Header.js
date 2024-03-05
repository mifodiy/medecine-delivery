import './Header.scss'

const Header = () => {
  return (
    <div className="header">
      <nav className="header__menu">
        <a className="header__link" href="#">Shop</a>
        <a className="header__link" href="#">Cart</a>
      </nav>
    </div>
  )
}

export default Header;