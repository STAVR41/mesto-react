function PopupWithForm({ title, name, children, isOpen, textSubmit, onClose }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <h3 className="popup__title">{title}</h3>
                <form action="#" name={name} noValidate className="form form_type_redact">
                    {children}
                    <button tabIndex="3" type="submit" className={`form__save form__save_type_${name}`}>{textSubmit}</button>
                </form>
                <button onClick={onClose} tabIndex="4" type="button" className="popup__close"></button>
            </div>
        </div >
    )
}
export default PopupWithForm


