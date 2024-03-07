import { useDispatch } from 'react-redux'

import { addItem } from '../CartList/cartSlice'
import './ProductItem.scss'

const ProductItem = ({title, url, id, price, shop, count}) => {
  const dispatch = useDispatch();

  const onAddItem = () => {
    dispatch(addItem({id, title, url, price, shop}))
  }

  return (
    <li className="product-item">
      <img className='product-item__img' src={url} alt={title} />
      <div className='product-item__box'>
        <h3 className="product-item__title">{title}<span className='product-item__price'>{price}грн.</span></h3>
				<div className="product-item__wrapper">
				<span className="product-item__count">{count && `${count} од.`}</span>
				<button className="btn btn-cart" onClick={onAddItem}>Add to cart</button>
				</div>
        
      </div>

    </li>
  )
}

export default ProductItem