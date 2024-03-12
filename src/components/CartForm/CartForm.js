import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api'

import  {useHttp} from '../../hook/http.hook'
import { clearCart } from "../CartList/cartSlice";
import Map from "../Map/Map";

import './CartForm.scss'

const libraries = ['places']

const CartForm = () => {
  const addressRef = useRef('');
  const [directionResponse, setDirectionResponse] = useState(null);
  const { totalPrice, items } = useSelector(state => state.cart);
  const { activeAddress } = useSelector(state => state.shops);
  const { request } = useHttp();
  const dispatch = useDispatch();
  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const schema = yup.object({
    firstName: yup.string().required('Name is a required field'),
    email: yup.string().email().required('Email is a required field'),
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('phone is a required field'),
    address: yup.string().required('Address is a required field')
  }).required();

  const { register, handleSubmit, formState: { errors } , reset, setValue} = useForm({
    resolver: yupResolver(schema)
  });

	const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    libraries
  })

  if (!isLoaded) {
    return <h5>Map is not loading</h5>
  }

  const calculateRout = async () => {
    if (addressRef.current.value === '') {
      return
    }

		setValue("address", addressRef.current.value, {shouldValidate: true});
		
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: activeAddress,
      destination: addressRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING
    });
    setDirectionResponse(result);
  }

  const onSubmit = data =>{
    const result = {...data, address: addressRef.current.value, items, totalPrice};

    request("https://647478397de100807b1b010c.mockapi.io/orders", 'POST', JSON.stringify(result))
    	.then(reset())
    	.then(dispatch(clearCart()))
    	.catch('Something went wrong')

  } 


  return (
    <form className="cart-form" onSubmit={handleSubmit(onSubmit)}>
			<Map directionResponse={directionResponse} />

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
        <Autocomplete onPlaceChanged={calculateRout}>
          <input className="cart-form__input" {...register("address")} type="text" ref={addressRef} />
        </Autocomplete>
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