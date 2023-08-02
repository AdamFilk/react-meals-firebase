import classes from './Modal.module.css';
import reactDom from 'react-dom';

const BackDrop = ({handleShowCart}) => { return <div className={classes.backdrop} onClick={() => handleShowCart(false)}/>}
const ModalOverlay = ({children}) => {
    return <div className={classes.modal}>
        <div className={classes.content}>{children}</div>
    </div>
}
const portalElement = document.getElementById('overlays');
const Modal = ({handleShowCart,children}) => {
    return (
        <>
            {reactDom.createPortal(<BackDrop handleShowCart={handleShowCart} />,portalElement)}
            {reactDom.createPortal(<ModalOverlay>{children}</ModalOverlay>,portalElement)}
        </>
    )
}

export default Modal;
