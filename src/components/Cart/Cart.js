import { useContext, useState } from 'react';
import Modal from '../Layouts/UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout/Checkout';
import { getDatabase, ref, set } from "firebase/database";
import db from '../../firebase-config';

const Cart = ({handleShowCart}) => {
    const [isCheckout,setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = cartCtx.totalAmount?.toFixed(2);
    const hasItems = cartCtx.items.length > 0;
    const cartItems = [{
        id:1,
        name:'Sushi',
        amount:2,
        price:12.99
    }];
    const itemRemoveHandler = (id) => {
        cartCtx.removeItemFromCart(id);
    }
    const itemAddHandler = (item) => {
        cartCtx.addItemToCart({
            ...item,
            amount: 1
        });
    }
    const onCheckout = (formData) => {
        console.log(formData)
        set(ref(db, 'checkout/' + Date.now()), {
            orderList: cartCtx.items,
            user: formData
         });
         cartCtx.clearCart();
         setIsCheckout(false);
    }
    return (
    <Modal handleShowCart={handleShowCart}>
        {
            cartCtx.items?.map(item => (
                <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={itemRemoveHandler.bind(null,item.id)} onAdd={itemAddHandler.bind(null,item)}/>
            ))
        }
        <div className={classes.total}>
            <span>Total</span>
            <span>{totalAmount}</span>
        </div>
        {
            isCheckout ? 
            <Checkout onCheckout={onCheckout} onClose={() => setIsCheckout(false)}/> 
            :
            <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={() => handleShowCart(false)}>Close</button>
            {
                hasItems && <button className={classes['button']} onClick={() => setIsCheckout(true)}>Order</button>
            }
            </div>
        }
      
    </Modal>)
}

export default Cart;