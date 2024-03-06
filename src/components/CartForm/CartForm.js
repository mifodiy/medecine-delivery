import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import  {useHttp} from '../../hook/http.hook'
import { clearCart } from "../CartList/cartSlice";

import './CartForm.scss'

const CartForm = () => {
  const {totalPrice, items} = useSelector(state => state.cart);
  const {request} = useHttp();
  const dispatch = useDispatch();
  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const schema = yup.object({
    firstName: yup.string().required('Name is a required field'),
    email: yup.string().email().required('Email is a required field'),
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('phone is a required field'),
    address: yup.string().required('Address is a required field')
  }).required();

  const { register, handleSubmit, formState: { errors } , reset} = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data =>{
    const result = {...data, items};

    request("http://localhost:3001/orders", 'POST', JSON.stringify(result))
    .then(reset())
    .then(dispatch(clearCart()))
    .catch('Bad')

  } 


  return (
    <form className="cart-form" onSubmit={handleSubmit(onSubmit)}>

      <label className="cart-form__label">
        Name:
        <input className="cart-form__input" {...register("firstName")} />
      </label>
      <p className="cart-form__error">{errors.firstName?.message}</p>

      <label className="cart-form__label">
        Email:
        <input className="cart-form__input" {...register("email")} />
      </label>
      <p className="cart-form__error">{errors.email?.message}</p>
      <label className="cart-form__label">
        Phone:
        <input className="cart-form__input" {...register("phoneNumber")} />
      </label>
      <p className="cart-form__error">{errors.phoneNumber?.message}</p>
      <label className="cart-form__label">
        Address:
        <input className="cart-form__input" {...register("address")} />
      </label>
      <p className="cart-form__error">{errors.address?.message}</p>

      <div className="cart-form__box">
        <span className="cart-form__price">Total price: {totalPrice}</span>
        <button className="cart-form__btn" type="submit" >Submit</button>
      </div>
    </form>
  )
}

export default CartForm;