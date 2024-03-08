const ShopItem = ({name, id, activeShop, onChangeShop}) => {
  const className = id === activeShop ? "shop__item active btn" : "shop__item btn"
  return (
    <li className={className} onClick={() => onChangeShop(id)}>
      {name}
    </li>
  )
}

export default ShopItem