import { cards } from "../utils/cards.js"


class Popup {
  constructor() {
    this.popup = document.getElementById(`popup`)

    this._initListeners()
  }

  _initListeners() {
    if (!this.popup) { return }

    this.backdrop = document.querySelector(`.popup__backdrop`)
    this.closeButton = document.querySelector(`.popup__close`)

    document.addEventListener(`click`, (e) => {
      if (e.target.classList.contains(`pet`)) {
        const petId = e.target.dataset.name
        petId && this.showPopup(petId)
      }
    })

    this.backdrop.addEventListener(`click`, () => this.closePopup())
    this.closeButton.addEventListener(`click`, () => this.closePopup())
  }

  showPopup(id) {
    console.log(id)
    this._disableScroll()
    this.popup.classList.add(`popup--open`)

    this.escListener = (e) => {
      (e.key === `Escape`) && this._closePopup()
    }
    document.addEventListener(`keydown`, this.escListener)
  }

  closePopup() {
    this._enableScroll()
    this.popup.classList.remove(`popup--open`)
    document.removeEventListener(`keydown`, this.escListener)
  }

  _disableScroll() {
    document.body.style.overflow = `hidden`
  }

  _enableScroll() {
    document.body.style.overflow = `visible`
  }
}


export { Popup }
