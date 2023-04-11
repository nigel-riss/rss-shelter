import { cards } from '../utils/cards.js';


class Slider {
  constructor() {
    this.slider = document.getElementById(`pet-slider`)
    this.leftButton = this.slider.querySelector(`#pet-slider__left`)
    this.rightButton = this.slider.querySelector(`#pet-slider__right`)
    this.slidesContainer = this.slider.querySelector(`.pet-slider__slides`)

    this.isEnabledControls = true

    this._updateLimits()
    this._renderCards(true)
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
      this.isEnabledControls = true
    })
  }

  _updateLimits() {
    const isTabletPlus = window.matchMedia(`(min-width: 768px)`).matches
    const isDesktopPlus = window.matchMedia(`(min-width: 1200px)`).matches

    this.leftShift = `-59.5rem`
    this.centerShift = `-30.5rem`
    this.rightShift = `-1.5rem`

    if (isTabletPlus) {
      this.leftShift = `-127.5rem`
      this.centerShift = `-65.5rem`
      this.rightShift = `-3.5rem`
    }

    if (isDesktopPlus) {
      this.leftShift = `-224.5rem`
      this.centerShift = `-116.5rem`
      this.rightShift = `-8.5rem`
    }
  }

  _renderCards(isRenderNew = false, newMainOrder) {
    const cardsOrder = this._getCardsOrder(isRenderNew, newMainOrder)

    let slidesHTML = ``

    for (let i = 0; i < 3; i++) {
      let cardsHTML = ``
      for (let j = 0; j < 3; j++) {
        cardsHTML += this._getCardHTML(cards[cardsOrder[i * 3 + j]])
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

  _getCardsOrder(isRegenerate = false, newMainOrder) {
    const getIndexPool = () => new Array(8)
      .fill(null)
      .map((_el, i) => i)

    const getRandomItemFromPool = (pool, bans) => {
      let randomIndex = null

      do {
        randomIndex = Math.floor(Math.random() * pool.length)
      } while(bans.includes(pool[randomIndex]))

      return pool.splice(randomIndex, 1)[0]
    }

    if (isRegenerate) {
      const getRandomOrderOf3 = (pool, bans) => new Array(3)
        .fill(null)
        .map(() => getRandomItemFromPool(pool, bans))
  
  
      const indexPool = getIndexPool()
      this.mainCardsOrder = newMainOrder || getRandomOrderOf3(
        indexPool,
        [],
      )
  
      this.sideCardsOrder = getRandomOrderOf3(
        indexPool,
        this.mainCardsOrder
      )
    }

    return [...this.sideCardsOrder, ...this.mainCardsOrder, ...this.sideCardsOrder]
  }

  _resetPosition() {
    this.slidesContainer.classList.add(`pet-slider__slides--not-animated`)
    this.slidesContainer.style.left = this.centerShift
    const __dummyHack = this.slidesContainer.offsetWidth
    window.requestAnimationFrame(() => {
      this.slidesContainer.classList.remove(`pet-slider__slides--not-animated`)
      this.isEnabledControls = true
    })
  }

  slideLeft() {
    if (this.isEnabledControls) {
      this.isEnabledControls = false
      this.slidesContainer.style.left = this.leftShift

      setTimeout(() => {
        this._resetPosition()
        this._renderCards(true, this.sideCardsOrder)
      }, 500)
    }
  }

  slideRight() {
    if (this.isEnabledControls) {
      this.isEnabledControls = false
      this.slidesContainer.style.left = this.rightShift

      setTimeout(() => {
        this._resetPosition()
        this._renderCards(true, this.sideCardsOrder)
      }, 500)
    }
  }
}


export { Slider }
