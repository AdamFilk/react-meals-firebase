import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import db from "../../../firebase-config";
import { getDatabase, ref, onValue } from "firebase/database";
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
    const [meals,setMeals] = useState([]);
    const [loading,setLoading] = useState(false);
    const [showError,setShowError] = useState(false);
    const getMeals = async () => {
      setLoading(true);
      const mealsListRef = ref(db,'meals');
      try{
        await onValue(mealsListRef, (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          setMeals(data);
          setLoading(false);
        });
      }catch(error){
        console.log(error);
        setShowError(true);
      }
    }
    useEffect(()=>{
     getMeals();
    },[])
    if(loading || showError){
      return (
        <section className={classes.MealsLoading}>
          <p>
            {
              showError ? 'Sorry Cannot!' : 'Loading ...'
            }
          </p>
        </section>
      )
    }
    return (<>
        <section className={classes.meals}>
        <Card>
            <ul>
                {meals && meals.map(meal => (
                  <MealItem key={meal.id} meal={meal}/>
                ))}
            </ul>
        </Card>
        </section>
    </>)
}

export default AvailableMeals;