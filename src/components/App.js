import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";


function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [submitTextButton, setSubmitTextButtton] = useState("");

  useEffect(() => {
    api.getUserInfo()
      .then(res => setCurrentUser(res))
      .catch(err => console.log(`Ошибка ${err}`));
    api.getInitialCards()
      .then(res => setCards(res))
      .catch(err => console.log(`Ошибка ${err}`));
  }, [])

  function handleCardClick(card) {
    setSelectedCard(card)
  }
  function handleEditProfileClick() {
    setSubmitTextButtton("Сохранить")
    setIsEditProfilePopupOpen((editProfilePopup) => !editProfilePopup)
  }
  function handleAddPlaceClick() {
    setSubmitTextButtton("Создать")
    setIsAddPlacePopupOpen((addPlacePopup) => !addPlacePopup)
  }
  function handleEditAvatarClick() {
    setSubmitTextButtton("Сохранить")
    setIsEditAvatarPopupOpen((editAvatarPopup) => !editAvatarPopup)
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.addLike(card._id)
        .then(newCard => setCards((state) => state.map((userCard) => userCard._id === card._id ? newCard : userCard)))
        .catch(err => console.log(`Ошибка ${err}`))
    } else {
      api.removeLike(card._id)
        .then(newCard => setCards((state) => state.map((userCard) => userCard._id === card._id ? newCard : userCard)))
        .catch(err => console.log(`Ошибка ${err}`))
    }
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => setCards((item) => item.filter((elem) => elem._id !== card._id)))
      .catch(err => console.log(`Ошибка ${err}`));
  }
  function handleUpdateUser(userInfo) {
    setSubmitTextButtton("Сохранение...")
    api.setProfileUser(userInfo.name, userInfo.about)
      .then(res => {
        setCurrentUser({ ...currentUser, name: res.name, about: res.about })
        closeAllPopups()
      })
      .catch(err => console.log(`Ошибка ${err}`))
      .finally(() => setSubmitTextButtton("Сохранить"))
  }
  function handleUpdateAvatar(avatar) {
    setSubmitTextButtton("Сохранение...")
    api.setAvatarUser(avatar)
      .then(res => {
        setCurrentUser({ ...currentUser, avatar: res.avatar })
        closeAllPopups()
      })
      .catch(err => console.log(`Ошибка ${err}`))
      .finally(() => setSubmitTextButtton("Сохранить"))
  }
  function handleAddPlaceSubmit(newCard) {
    setSubmitTextButtton("Создание...")
    api.addNewCard(newCard.name, newCard.link)
      .then(res => {
        setCards([res, ...cards])
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка ${err}`))
      .finally(() => setSubmitTextButtton("Создать"))
  }

  return (
    <div className="wrapper">
      <div className="container">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main onCardDelete={handleCardDelete} cards={cards} onCardLike={handleCardLike} onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
          <Footer />
          <EditProfilePopup textLoadingSubmit={submitTextButton} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          <EditAvatarPopup textLoadingSubmit={submitTextButton} onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
          <AddPlacePopup textLoadingSubmit={submitTextButton} cards={cards} onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
          <ImagePopup onClose={closeAllPopups} name={"img"} card={selectedCard} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
