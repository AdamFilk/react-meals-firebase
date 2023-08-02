import { useState } from 'react';
import classes from './Checkout.module.css';


const Checkout = ({onCheckout,onClose}) => {
  const [formData,setFormData] = useState({
    name:'',
    street:'',
    postal:'',
    city:''
  });
  
  const confirmHandler = (event) => {
    event.preventDefault();
    onCheckout(formData);
  };

  const handleInputChange = (name,val) => {
    setFormData(prev => {
        return {
            ...prev,
            [`${name}`]:val
        }
    });
  }

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' name='name' onChange={e => handleInputChange(e.target.name,e.target.value)} required/>
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' name='street' onChange={e => handleInputChange(e.target.name,e.target.value)} required/>
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' name='postal' onChange={e => handleInputChange(e.target.name,e.target.value)} required/>
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' name='city' onChange={e => handleInputChange(e.target.name,e.target.value)} required/>
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;