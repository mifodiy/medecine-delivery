const ShopItem = ({name, id, onChangeShop}) => {
  return (
    <li className="shop__item btn" onClick={() => onChangeShop(id)}>
      {name}
    </li>
  )
}

export default ShopItem