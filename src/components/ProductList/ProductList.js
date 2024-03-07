import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ProductItem from '../ProductItem/ProductItem'
import Spinner from '../Spinner/Spinner'
import {sortByPriceASC, sortByPriceDESC, sortByTime} from '../ShopList/shopSlice'

import './ProductList.scss'

const ProductList = () => {
	const {activeShop, products, shopsLoadingStatus} = useSelector(state => state.shops);
  const cartItems = useSelector(state => state.cart.items);
  const [isFilterASC, setIsFilterASC] = useState(true);
  const dispatch = useDispatch();


	useEffect(() => {
    renderProductList(products)
  },[activeShop])

  const handlFilterByPrice = () => {
    if (isFilterASC) {
      dispatch(sortByPriceASC());
      setIsFilterASC(!isFilterASC);
    } else {
      dispatch(sortByPriceDESC())
      setIsFilterASC(!isFilterASC)
    }
  }

  const handlFilterByTime = () => {
    dispatch(sortByTime());
  }

	if (shopsLoadingStatus === "loading") {
    return <Spinner />;
  } else if (shopsLoadingStatus === "error") {
    return <h5 className="error">Ошибка загрузки</h5>
  }

	const renderProductList = (products) => {
    return products.map(({id, ...props}) => {
      const count = cartItems.filter((item) => item.id === id)[0]?.count;

      return <ProductItem key={id} id={id} count={count} {...props}/>
    })
  }

	const elements = renderProductList(products)

  return (
    <div className="product">
      <div className='product__filters'>
        <button className='product__btn' onClick={handlFilterByTime}>Самі нові</button>
        <button className='product__btn' onClick={handlFilterByPrice}>
          {isFilterASC ? 'Від меншого к більшому' :'Від більшого к меншому' }
        </button>
      </div>
      <ul className="product__list">
        {elements}
      </ul>
    </div>
    
  )
}

export default ProductList