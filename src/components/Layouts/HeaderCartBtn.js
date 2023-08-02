import CartIcon from '../Cart/CartIcon';
import styles from './Header.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartBtn = ({handleShowCart}) => {
    const [btnHighlighted,setBtnHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const numberOfItems = cartCtx.items.reduce((curNum,item) => {
        return curNum + item.amount;
    },0);
    const btnClasses = `${styles.button} ${btnHighlighted ? styles.bump : ''}`;
    useEffect(()=>{
        if(cartCtx.items.length === 0){
            return
        }
        setBtnHighlighted(true);
        const timer = setTimeout(()=>{
            setBtnHighlighted(false);
        },300);

        return () => clearTimeout(timer);
    },[cartCtx]);
    return (<>
        <button className={btnClasses} onClick={() => handleShowCart(true)}>
            <span className={styles.icon}>  
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>
                {numberOfItems}
            </span>
        </button>
    </>)
}

export default HeaderCartBtn;