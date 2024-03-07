import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import { searchOrder } from "../OrderList/orderSlice";

import './OrderForm.scss'


const OrderForm = () => {

  const dispatch = useDispatch();
  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const schema = yup.object({
    email: yup.string().email().required('Email is a required field'),
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('phone is a required field')
  }).required();

  const { register, handleSubmit, formState: { errors } , reset} = useForm({
    resolver: yupResolver(schema)
  });


  const onSubmit = data =>{
   dispatch(searchOrder(data))
	 reset()
  } 


  return (
    <form className="order-form" onSubmit={handleSubmit(onSubmit)}>
			<h2 className='order-form__title'>Пошук замовлень</h2>
			<div className='order-form__wrapper'>
				<label className="order-form__label">
      	  Email:
      	  <input className="order-form__input" {...register("email")} />
      		<span className="order-form__error">{errors.email?.message}</span>
      	</label>
      	<label className="order-form__label">
      	  Phone:
      	  <input className="order-form__input" {...register("phoneNumber")} />
      		<span className="order-form__error">{errors.phoneNumber?.message}</span>
      	</label>
		
      	<button className="order-form__btn" type="submit" >Пошук</button>
			</div>
      
    </form>
  )
}

export default OrderForm;