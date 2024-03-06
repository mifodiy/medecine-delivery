import { useSelector } from 'react-redux'

import CartItem from '../CartItem/CartItem'
import './CartList.scss'

const CartList = () => {
  const {items} = useSelector(state => state.cart)
  console.log(items)

  const elements = items.length>0 ? items.map(({id, ...props}) => {
    return <CartItem key={id} id={id} {...props}/>
  }) : <h3>Cart is Empty</h3>
  return (
    <div className="cart-list">
      <ul className="cart-list__items">
        {elements}
      </ul>
    </div>
  )
}

export default CartList