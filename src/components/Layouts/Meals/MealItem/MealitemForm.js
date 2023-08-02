import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = ({meal,addToCart}) => {
    const [error,setError] = useState(null);
    const inputRef = useRef();
    const submitHandler = e => {
        e.preventDefault();
        const amount = inputRef.current.value;
        const amountNumber = +amount;
        if(amount.trim() !== '' && (amountNumber > 1 || amountNumber < 5)){
            setError(null);
            addToCart(amountNumber);
        }else{
            setError('Invalid Amount');
        }
    }
    return (<>
        <form className={classes.form} onSubmit={submitHandler}>
            <Input 
            ref={inputRef}
            label="Amount" 
            input={{
                id:'amount'+meal.id,
                type: 'number',
                min:'1',
                max:'5',
                step:'1',
                defaultValue:'1'
            }}/>
            <button>Add +</button>
            {error && <span style={{color:'red'}}>{error}</span>}
        </form>
    </>)
}

export default MealItemForm;