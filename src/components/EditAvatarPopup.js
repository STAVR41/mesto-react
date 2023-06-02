import { useRef } from "react";
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({ textLoadingSubmit, onUpdateAvatar, isOpen, onClose }) {
    const avatar = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatar.current.value)
    }
    return (
        <PopupWithForm textLoadingSubmit={textLoadingSubmit} onSubmit={handleSubmit} onClose={onClose} title={"Обновить аватар"} name={"avatar"} isOpen={isOpen}>
            <input ref={avatar} required tabIndex="1" type="url" name="avatar" id="avatar-input"
                className="form__input form__input_type_avatar" placeholder="Ссылка на картинку" />
            <span className="avatar-input-error form__input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup