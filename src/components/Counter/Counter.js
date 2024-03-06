import {useState} from "react"

import './Counter.scss'

const Counter = ({amount, dec, inc}) => {
  const [count, setCount] = useState(amount);

  const onIncriment = () => {
    if (count < 99)
    inc();
    setCount(state => state + 1);
  }

  const onDecrement = () => {
    if (count > 1) {
      dec();
      setCount(state => state - 1);
    }
  }

  return (
    <div className="count">
      <span className="count__amount">{count}</span>
      <div className="count__buttons">
        <button className="count__btn count__btn--plus" onClick={onIncriment}/>
        <button className="count__btn count__btn--minus" onClick={onDecrement}/>
      </div>
    </div>
  )
}

export default Counter;