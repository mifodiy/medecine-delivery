import ShopList from "../ShopList/ShopList"
import ProductList from "../ProductList/ProductList"

const ShopPage = () => {
  return (
    <div className='shop__wrapper'>
      <ShopList />
      <ProductList />
    </div>
  )
}

export default ShopPage