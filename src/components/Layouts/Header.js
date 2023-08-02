import MealsImage from '../../assets/imgs/meals.jpg';
import style from './Header.module.css';
import HeaderCartBtn from './HeaderCartBtn';
const Header = ({handleShowCart}) => {
    return (<>
        <header className={style.header}>
            <h1>Yumeals</h1>
            <HeaderCartBtn handleShowCart={handleShowCart}/>
        </header>
        <div className={style['main-image']}>
            <img src={MealsImage} alt='Meals'/>
        </div>
    </>)
}

export default Header;