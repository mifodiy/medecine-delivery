import ShopItem from "../ShopItem/ShopItem"
import './shopsList.scss'

const ShopList = ({shops}) => {

  return (
    <div className="shop">
      <h2 className="shop__title">Shops</h2>
      <ul className="shop__list">
        {shops.map(item => {
    			return <ShopItem key={item.id} name={item.name} id={item.id}/>
  				})}
      </ul>
    </div>

  )
}

export default ShopList