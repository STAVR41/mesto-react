import { useEffect, useState } from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const [userName, setUserName] = useState();
    const [userDescription, setUserDescription] = useState();
    const [userAvatar, setUserAvatar] = useState();
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfo()
            .then(res => {
                setUserName(res.name)
                setUserDescription(res.about)
                setUserAvatar(res.avatar)
            })
    }, [])
    useEffect(() => {
        api.getInitialCards()
            .then(res => {
                setCards(res)
            })
    }, [])

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__image-container">
                    <div onClick={onEditAvatar} className="profile__img-cover">
                        <div className="profile__img" style={{ backgroundImage: `url(${userAvatar})` }}></div>
                    </div>
                    <div className="profile__container">
                        <div className="profile__info-container">
                            <h1 className="profile__title">{userName}</h1>
                            <button onClick={onEditProfile} type="button" className="profile__edit-button"></button>
                        </div>
                        <p className="profile__subtitle">{userDescription}</p>
                    </div>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__add-button"></button>
            </section>
            <section className="cards">
                {cards.map(card =>
                    <Card onCardClick={onCardClick} card={card} key={card._id} />
                )}
            </section>
        </main>
    )
}
export default Main