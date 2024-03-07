import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import OrderItem from '../OrderItem/OrderItem'
import Spinner from '../Spinner/Spinner'
import { fetchOrders } from "./orderSlice"

import './OrderList.scss'

const OrderList = () => {
	const { serchOrders, ordersLoadingStatus} = useSelector(state => state.orders);
  const dispatch = useDispatch();


	useEffect(() => {
    dispatch(fetchOrders())
  },[])
  

	if (ordersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (ordersLoadingStatus === "error") {
    return <h5 className="error">Ошибка загрузки</h5>
  }

	const renderProductList = (orders) => {
    return orders.map((order) => {
      return <OrderItem key={order.id} price={order.totalPrice}  items={order.items}/>
    })
  }

	const elements = serchOrders.length > 0 ? renderProductList(serchOrders) : <h3>Нємає жодного замовлення</h3>

  return (
    <ul className="order-list">
      {elements}
    </ul>
    
  )
}

export default OrderList