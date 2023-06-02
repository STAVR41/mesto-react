
function PopupWithForm({ textLoadingSubmit, onSubmit, title, name, children, isOpen, onClose }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <h3 className="popup__title">{title}</h3>
                <form onSubmit={onSubmit} action="#" name={name} className="form form_type_redact">
                    {children}
                    <button tabIndex="3" type="submit" className={`form__save form__save_type_${name}`}>{textLoadingSubmit}</button>
                </form>
                <button onClick={onClose} tabIndex="4" type="button" className="popup__close"></button>
            </div>
        </div >
    )
}
export default PopupWithForm


