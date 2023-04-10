import { cards } from '../utils/cards.js';


class Slider {
  constructor() {
    this.slider = document.getElementById(`pet-slider`)
    this.leftButton = this.slider.querySelector(`#pet-slider__left`)
    this.rightButton = this.slider.querySelector(`#pet-slider__right`)
    this.slidesContainer = this.slider.querySelector(`.pet-slider__slides`)

    console.log(this.slidesContainer)

    this._updateLimits()
    this._renderCards()
    this._resetPosition()
    this._initListeners()
  }

  _initListeners() {
    this.rightButton.addEventListener(`click`, () => this.slideRight())
    this.leftButton.addEventListener(`click`, () => this.slideLeft())

    window.addEventListener(`resize`, () => {
      this._updateLimits()
      this._renderCards()
      this._resetPosition()
    })
  }

  _updateLimits() {
    const isTabletPlus = window.matchMedia(`(min-width: 768px)`).matches
    const isDesktopPlus = window.matchMedia(`(min-width: 1200px)`).matches

    this.cardsPerSlide = 1
    this.leftShift = `-59.5rem`
    this.centerShift = `-30.5rem`
    this.rightShift = `-1.5rem`

    if (isTabletPlus) {
      this.cardsPerSlide = 2
      this.leftShift = `-127.5rem`
      this.centerShift = `-65.5rem`
      this.rightShift = `-3.5rem`
    }

    if (isDesktopPlus) {
      this.cardsPerSlide = 3
      this.leftShift = `-224.5rem`
      this.centerShift = `-116.5rem`
      this.rightShift = `-8.5rem`
    }
  }

  _renderCards() {
    let slidesHTML = ``

    for (let i = 0; i < 3; i++) {
      let cardsHTML = ``
      for (let j = 0; j < this.cardsPerSlide; j++) {
        cardsHTML += this._getCardHTML(cards[Math.floor(Math.random() * 8)])
      }

      slidesHTML += `
        <div class="pet-slider__slide">
          ${cardsHTML}
        </div>
      `
    }

    this.slidesContainer.innerHTML = slidesHTML
  }

  _getCardHTML(cardData) {
    const {
      id,
      name,
      img,
    } = cardData

    const cardHTML = `
      <article class="pet" data-name="${id}">
        <div class="pet__image"><img src="./img/pets/${img}" alt="${name}"></div>
        <div class="pet__caption">
          <h3 class="pet__title">${name}</h3>
          <div class="pet__more"><a class="ghost-button" href="#">Learn more</a></div>
        </div>
      </article>
    `

    return cardHTML
  }

  _resetPosition() {
    this.slidesContainer.style.left = this.centerShift
  }

  slideLeft() {
    this.slidesContainer.style.left = this.leftShift
  }

  slideRight() {
    this.slidesContainer.style.left = this.rightShift
  }
}


export { Slider }
