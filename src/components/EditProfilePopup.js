import { useContext, useEffect, useState } from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ textLoadingSubmit, onUpdateUser, isOpen, onClose }) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setName(currentUser.name)
        setDescription(currentUser.about)
    }, [currentUser, isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({ name, about: description })
    }

    return (
        <PopupWithForm textLoadingSubmit={textLoadingSubmit} onSubmit={handleSubmit} onClose={onClose} title={"Редактировать профиль"} name={"redact"} isOpen={isOpen}>
            <input value={name ?? ""} onChange={e => setName(e.target.value)} maxLength="40" minLength="2" id="name-input" tabIndex="1" type="text" name="profileName"
                className="form__input form__input_type_name" placeholder="Имя" required />
            <span className="name-input-error form__input-error"></span>
            <input value={description ?? ""} onChange={e => setDescription(e.target.value)} maxLength="200" minLength="2" id="job-input" tabIndex="2" type="text" name="profileJob"
                className="form__input form__input_type_job" placeholder="Профессия" required />
            <span className="job-input-error form__input-error"></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup