import CartList from "../CartList/CartList"
import CartForm from '../CartForm/CartForm'

const CartPage = () => {
  return (
    <div className="cart__wrapper" style={{display: 'flex'}}>
      <CartList />
      <CartForm />
    </div>
  )
}

export default CartPage