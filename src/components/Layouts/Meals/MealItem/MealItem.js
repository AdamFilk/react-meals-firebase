import { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealitemForm';
import CartContext from '../../../../store/cart-context';

const MealItem = ({meal}) => {
    const cartCtx = useContext(CartContext);
    const addToCart = (amount) => {
        cartCtx.addItemToCart({
            ...meal,
            amount
        });
    }
    return (
            <li className={classes.meal}>
                <div>
                    <h3>{meal.name}</h3>
                    <div className={classes.description}>{meal.description}</div>
                    <div className={classes.price}>{meal.price?.toFixed(2)}</div>
                </div>
                <div>
                    <MealItemForm meal={meal} addToCart={addToCart}/>
                </div>
            </li>
    )
}

export default MealItem;