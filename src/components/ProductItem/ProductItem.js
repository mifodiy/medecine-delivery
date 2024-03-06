import { useDispatch } from 'react-redux'

import { addItem } from '../CartList/cartSlice'
import './ProductItem.scss'

const ProductItem = ({title, url, id, price}) => {
  const dispatch = useDispatch();

  const onAddItem = () => {
    dispatch(addItem({id, title, url, price}))
  }

  return (
    <li className="product-item">
      <img className='product-item__img' src={url} alt={title} />
      <div className='product-item__box'>
        <h3 className="product-item__title">{title}</h3>
        <button className="btn btn-cart" onClick={onAddItem}>Add to cart</button>
      </div>

    </li>
  )
}

export default ProductItem