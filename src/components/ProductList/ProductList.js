import ProductItem from '../ProductItem/ProductItem'
import './ProductList.scss'

const ProductList = ({menu}) => {

  return (
    <ul className="product-list">
      {menu.map(({id, ...props}) => {
      return <ProductItem key={id} {...props}/>
    })}
    </ul>
  )
}

export default ProductList