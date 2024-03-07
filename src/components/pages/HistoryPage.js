import OrderForm from '../OrderForm/OrderForm';
import OrderList from '../OrderList/OrderList'

const HistoryPage = () => {
  return (
    <div className="order__wrapper">
      <OrderForm/>
      <OrderList/>
    </div>
  )
}

export default HistoryPage;