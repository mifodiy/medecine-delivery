import './ProductItem.scss'

const ProductItem = ({title, url}) => {
  return (
    <li className="product-item">
      <img className='product-item__img' src={url} alt={title} />
      <div className='product-item__box'>
        <h3 className="product-item__title">{title}</h3>
        <button className="btn btn-cart">Add to cart</button>
      </div>

    </li>
  )
}

export default ProductItem