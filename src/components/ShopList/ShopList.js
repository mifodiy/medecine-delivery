import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'

import ShopItem from "../ShopItem/ShopItem"
import Spinner from '../Spinner/Spinner'
import { fetchShops, changeActiveShop } from "./shopSlice"
import './ShopList.scss'

const ShopList = () => {
	const dispatch = useDispatch();
  const {shops, shopsLoadingStatus, activeShop} = useSelector(state => state.shops)
	const {processShop} = useSelector(state => state.cart)

	useEffect(() => {
    console.log('useEffect')
    dispatch(fetchShops())
  },[])

	const onChangeShop = (id) => {
    if (!processShop){
      dispatch(changeActiveShop(id));
    }
    
    if (processShop && id !== activeShop) {
      alert('В вашему кошику є товари з іншої аптеки');
    }
  }

	if (shopsLoadingStatus === "loading") {
    return <Spinner />;
  } else if (shopsLoadingStatus === "error") {
    return <h5 className="error">Ошибка загрузки</h5>
  }

	const elements = shops?.map(item => {
    return <ShopItem key={item.id} name={item.name} id={item.id} activeShop={activeShop} onChangeShop={onChangeShop}/>
  })

  return (
    <div className="shop">
      <h2 className="shop__title">Shops</h2>
      <ul className="shop__list">
        {elements}
      </ul>
    </div>

  )
}

export default ShopList