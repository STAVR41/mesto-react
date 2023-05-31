import { useState } from "react";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup({ textLoadingSubmit, onAddPlace, onClose, isOpen }) {
    const [newCard, setNewCard] = useState({
        name: "",
        link: "",
    })

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(newCard)
    }

    return (
        <>
            <PopupWithForm textLoadingSubmit={textLoadingSubmit} onSubmit={handleSubmit} onClose={onClose} title={"Новое место"} name={"card"} isOpen={isOpen} >
                <input onChange={e => setNewCard({ ...newCard, name: e.target.value })} required maxLength="30" minLength="2" tabIndex="1" type="text" name="cardName" id="cardName-input"
                    className="form__input form__input_type_text" placeholder="Название" />
                <span className="cardName-input-error form__input-error"></span>
                <input onChange={e => setNewCard({ ...newCard, link: e.target.value })} required tabIndex="2" type="url" name="cardImg" id="link-input"
                    className="form__input form__input_type_link" placeholder="Ссылка на картинку" />
                <span className="link-input-error form__input-error"></span>
            </PopupWithForm>
        </>
    )
}
export default AddPlacePopup 