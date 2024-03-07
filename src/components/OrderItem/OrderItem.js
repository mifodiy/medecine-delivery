import ProductItem from '../ProductItem/ProductItem'

const OrderItem = ({price, items}) => {

	const elements = items.map(({id, ...props}) => (<ProductItem key={id} type={'order'} {...props}/>))

  return (
    <div className='order-item'>
			<ul className='order-item__list'>
				{elements}
			</ul>
			<span className='order-item__price'>Загальна вартість: {price} грн.</span>
		</div>
  )
}

export default OrderItem