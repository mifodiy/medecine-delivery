import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import ProductItem from '../ProductItem/ProductItem'
import Spinner from '../Spinner/Spinner'

import './ProductList.scss'

const ProductList = () => {
	const {activeShop, shops, shopsLoadingStatus} = useSelector(state => state.shops);
  const products = shops.length > 1 ? shops.filter(item => item.id === activeShop)[0].items : []


	useEffect(() => {
    renderProductList(products)
  },[activeShop])

	if (shopsLoadingStatus === "loading") {
    return <Spinner />;
  } else if (shopsLoadingStatus === "error") {
    return <h5 className="error">Ошибка загрузки</h5>
  }

	const renderProductList = (products) => {
    return products.map(({id, ...props}) => {
      return <ProductItem key={id} id={id} {...props}/>
    })
  }

	const elements = renderProductList(products)

  return (
    <ul className="product-list">
      {elements}
    </ul>
  )
}

export default ProductList