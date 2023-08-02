import { useReducer } from "react";
import CartContext from "./cart-context";
const defaultState = {
    items:[],
    totalAmount:0
}
const cartReducer = (state,action) => {
    if(action.type === 'ADD'){
        const itemIndex = state.items.findIndex(item => item.id === action.item.id);

        if(itemIndex !== -1){
            const existingItem = state.items[itemIndex];
            const updatedItem =  {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            };
            const updatedItems = [...state.items];
            updatedItems[itemIndex] = updatedItem;
            const updatedAmount = state.totalAmount + (action.item.price * action.item.amount);
            return {
                items:updatedItems,
                totalAmount:updatedAmount
            }
            
        }else{
            const updatedItems = state.items.concat(action.item);
            const updatedAmount = state.totalAmount + (action.item.price * action.item.amount);
            return {
                items: updatedItems,
                totalAmount:updatedAmount
            };
        }
 
    }else if(action.type === 'RM'){
        const rmItem = state.items.find(item => item.id === action.id);
        const updatedItems = state.items.filter(item => item.id === action.id);
        const updatedAmount = state.totalAmount - (rmItem.amount + rmItem.price);
        return {
            items:updatedItems,
            totalAmount:updatedAmount
        }
    }  else if (action.type === 'REMOVE'){
        const rmItemIndex = state.items.findIndex(item => item.id === action.id);
        if(rmItemIndex !== -1){
            let updatedItems = [...state.items];
            const rmItem = updatedItems[rmItemIndex];
            if(updatedItems[rmItemIndex].amount === 1){
                updatedItems = state.items.filter(item => item.id !== action.id);
            }else{
                updatedItems[rmItemIndex] = {
                    ...updatedItems[rmItemIndex],
                    amount: updatedItems[rmItemIndex].amount - 1
                };
            }
            const updatedAmount = state.totalAmount -  (rmItem.price);
            return {
                items: updatedItems,
                totalAmount: updatedAmount
            }
        }
    }
    else if(action.type === 'CLEAR'){
        return {
            items: [],
            totalAmount: 0
        }
    }
    return defaultState;
}
const CartProvider = ({children}) => {
    const [state,dispatch] = useReducer(cartReducer,defaultState);
    const addItemToCart = (item) => {
        dispatch({
            type:'ADD',
            item
        })
    }
    const removeItemFromCart = (id) =>{
        dispatch({
            type:'REMOVE',
            id
        })
    }
    const clearCart = () => {
        dispatch({
            type:'CLEAR'
        });
    }
    const cartContext = {
        items:state.items,
        totalAmount:state.totalAmount,
        addItemToCart,
        removeItemFromCart,
        clearCart
    }
    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;