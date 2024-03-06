import { useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import ProductItem from '../ProductItem/ProductItem'

import './ProductList.scss'

const ProductList = () => {
	const {activeShop, shops, shopsLoadingStatus} = useSelector(state => state.shops, shallowEqual);
  const products = shops.length > 1 ? shops.filter(item => item.id === activeShop)[0].items : []


	useEffect(() => {
    renderProductList(products)
  },[activeShop])

	const renderProductList = (products) => {
    return products.map(({id, ...props}) => {
      return <ProductItem key={id} id={id} {...props}/>
    })
  }

	const elements = shopsLoadingStatus==='loading'? <h5>Loading...</h5> : renderProductList(products)

  return (
    <ul className="product-list">
      {elements}
    </ul>
  )
}

export default ProductList