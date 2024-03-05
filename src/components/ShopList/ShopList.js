import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'

import ShopItem from "../ShopItem/ShopItem"
import { fetchShops } from "./shopSlice"
import './ShopList.scss'

const ShopList = () => {
	const dispatch = useDispatch();
  const {shops} = useSelector(state => state.shops)

	useEffect(() => {
    console.log('useEffect')
    dispatch(fetchShops())
  },[])

	const elements = shops?.map(item => {
    return <ShopItem key={item.id} name={item.name} id={item.id} />
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