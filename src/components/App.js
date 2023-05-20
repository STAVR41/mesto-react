import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm"
import ImagePopup from "./ImagePopup";


function App() {

  const [selectedCard, setSelectedCard] = useState({});



  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  function handleCardClick(card) {
    setSelectedCard(card)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(() => !isEditProfilePopupOpen)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(() => !isAddPlacePopupOpen)
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(() => !isEditAvatarPopupOpen)
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
  }

  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <Main onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
        <Footer />
        <PopupWithForm onClose={closeAllPopups} title={"Редактировать профиль"} name={"redact"} isOpen={isEditProfilePopupOpen} textSubmit={"Сохранить"}>
          <input maxLength="40" minLength="2" id="name-input" tabIndex="1" type="text" name="profileName"
            className="form__input form__input_type_name" placeholder="Имя" required />
          <span className="name-input-error form__input-error"></span>
          <input maxLength="200" minLength="2" id="job-input" tabIndex="2" type="text" name="profileJob"
            className="form__input form__input_type_job" placeholder="Профессия" required />
          <span className="job-input-error form__input-error"></span>
        </PopupWithForm>
        <PopupWithForm onClose={closeAllPopups} title={"Новое место"} name={"card"} isOpen={isAddPlacePopupOpen} textSubmit={"Создать"} >
          <input required maxLength="30" minLength="2" tabIndex="1" type="text" name="cardName" id="cardName-input"
            className="form__input form__input_type_text" placeholder="Название" />
          <span className="cardName-input-error form__input-error"></span>
          <input required tabIndex="2" type="url" name="cardImg" id="link-input"
            className="form__input form__input_type_link" placeholder="Ссылка на картинку" />
          <span className="link-input-error form__input-error"></span>
        </PopupWithForm>
        <PopupWithForm onClose={closeAllPopups} title={"Обновить аватар"} name={"avatar"} isOpen={isEditAvatarPopupOpen} textSubmit={"Сохранить"}>
          <input required tabIndex="1" type="url" name="avatar" id="avatar-input"
            className="form__input form__input_type_avatar" placeholder="Ссылка на картинку" />
          <span className="avatar-input-error form__input-error"></span>
        </PopupWithForm>
        <ImagePopup onClose={closeAllPopups} name={"img"} card={selectedCard} />
      </div>
    </div>
  );
}

export default App;
