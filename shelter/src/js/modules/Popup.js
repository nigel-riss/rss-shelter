import { cards } from "../utils/cards.js"


class Popup {
  constructor() {
    this.popup = document.getElementById(`popup`)
    if (!this.popup) { return }

    this.window = this.popup.querySelector(`.popup__window`)

    this._initListeners()
  }

  _initListeners() {
    document.addEventListener(`click`, (e) => {
      if (e.target.classList.contains(`pet`)) {
        const petId = e.target.dataset.name
        petId && this.showPopup(petId)
      }
    })
  }

  showPopup(id) {
    const cardData = cards.find(card => card.id === id)
    if (!cardData) { return }

    this._fillPopup(cardData)
    this._disableScroll()
    this.popup.classList.add(`popup--open`)

    this.backdrop = document.querySelector(`.popup__backdrop`)
    this.closeButton = document.querySelector(`.popup__close`)
    this.backdrop.addEventListener(`click`, () => this.closePopup())
    this.closeButton.addEventListener(`click`, () => this.closePopup())

    document.addEventListener(`keydown`, (e) => {
      if (e.key === `Escape`) {
        this.closePopup();
      }
    }, {
      once: true,
    })
  }

  closePopup() {
    this._enableScroll()
    this.popup.classList.remove(`popup--open`)
  }

  _disableScroll() {
    document.body.style.overflow = `hidden`
  }

  _enableScroll() {
    document.body.style.overflow = `visible`
  }

  _fillPopup(data) {
    if (!data) { return }

    const {
      name,
      img,
      type,
      breed,
      description,
      age,
      inoculations,
      diseases,
      parasites,
    } = data

    const popupHtml = `
      <div class="popup__close">
        <button class="circle-button"><img src="./img/icons/close.svg" alt="close"></button>
      </div>
      <div class="popup__image"><img src="./img/pets-modal/${img}" alt="${name}"></div>
      <div class="popup__content">
        <h2 class="popup__title">${name}</h2>
        <h3 class="popup__subtitle"><span class="popup__type">${type}</span> - <span class="popup__breed">${breed}</span></h3>
        <p class="popup__description">${description}</p>
        <ul class="popup__list">
          <li class="popup__item"><b>Age:</b> ${age}</li>
          <li class="popup__item"><b>Inoculations:</b> ${inoculations.join(`, `)}</li>
          <li class="popup__item"><b>Diseases:</b> ${diseases.join(`, `)}</li>
          <li class="popup__item"><b>Parasites:</b> ${parasites.join(`, `)}</li>
        </ul>
      </div>
    `

    this.window.innerHTML = popupHtml
  }
}


export { Popup }
