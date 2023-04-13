import { cards } from '../utils/cards.js'


const FAST_BACKWARD_ID = `fast-backward`
const BACKWARD_ID = `backward`
const FORWARD_ID = `forward`
const FAST_FORWARD_ID = `fast-forward`

const TOTAL_CARDS = 48


class Pagination {
  constructor() {
    this.currPage = 1
    this.cardsPerPage = 8
    this.maxPage = 6
    this.cardsOrder = this._getCardsOrder()

    this.container = document.getElementById(`all-friends`)
    this.contentContainer = this.container
      ?.querySelector(`.all-friends__content`)
    this.paginationContainer = this.container
      ?.querySelector(`.all-friends__pagination`)

    this._updateLimits()
    this._updatePagination(1, this.maxPage)
    this._initListeners()
  }

  _updateLimits() {
    const isTabletPlus = window.matchMedia(`(min-width: 600px)`).matches
    const isDesktopPlus = window.matchMedia(`(min-width: 1200px)`).matches

    this.cardsPerPage = 3
    this.maxPage = 16

    if (isTabletPlus) {
      this.cardsPerPage = 6
      this.maxPage = 8
    }

    if (isDesktopPlus) {
      this.cardsPerPage = 8
      this.maxPage = 6
    }

    if (this.currPage > this.maxPage) {
      this.currPage = this.maxPage
    }
  }

  _initListeners() {
    this.paginationContainer.addEventListener(`click`, (e) => {
      if (e.target.id === FAST_BACKWARD_ID) this.openFirstPage()
      if (e.target.id === BACKWARD_ID) this.openPrevPage()
      if (e.target.id === FORWARD_ID) this.openNextPage()
      if (e.target.id === FAST_FORWARD_ID) this.openLastPage()
    })

    window.addEventListener(`resize`, () => {
      this._updateLimits()
      this._updatePagination(this.currPage, this.maxPage)
    })
  }

  _getControls(pageNum, maxPage) {
    const controlsHTML = `
      <ul class="pagination">
        <li class="pagination__item">
          <button
            id="${FAST_BACKWARD_ID}"
            class="circle-button" 
            ${pageNum === 1 && `disabled`}
          >&lt;&lt;</button>
        </li>
        <li class="pagination__item">
          <button
            id="${BACKWARD_ID}"
            class="circle-button"
            ${pageNum === 1 && `disabled`}
          >&lt;</button>
        </li>
        <li class="pagination__item">
          <span class="pagination__current">${pageNum}</span>
        </li>
        <li class="pagination__item">
          <button
            id="${FORWARD_ID}"
            class="circle-button"
            ${pageNum === maxPage && `disabled`}
          >&gt;</button>
        </li>
        <li class="pagination__item">
          <button
            id="${FAST_FORWARD_ID}"
            class="circle-button"
            ${pageNum === maxPage && `disabled`}
          >&gt;&gt;</button>
        </li>
      </ul>
    `

    return controlsHTML
  }

  _getCard(cardData) {
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

  _getCardsOrder() {
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

    let cardsOrder = []
    let sixCardsOrder = []
    let indexPool = getIndexPool()

    while (cardsOrder.length < TOTAL_CARDS) {
      if (!indexPool.length) {
        indexPool = getIndexPool()
      }

      sixCardsOrder.push(getRandomItemFromPool(
        indexPool,
        sixCardsOrder,
      ))

      if (sixCardsOrder.length === 6) {
        cardsOrder = [...cardsOrder, ...sixCardsOrder]
        sixCardsOrder = []
      }
    }

    return cardsOrder
  }

  _updatePagination(pageNum, maxPage) {
    this.paginationContainer.innerHTML = this._getControls(pageNum, maxPage)

    const cardsHTML = this.cardsOrder
      .slice(
        (pageNum - 1) * this.cardsPerPage,
        pageNum * this.cardsPerPage,
      )
      .reduce((html, cardIndex) => {
        return html + this._getCard(cards[cardIndex])
      }, ``)

    this.contentContainer.innerHTML = cardsHTML
  }

  openFirstPage() {
    this.currPage = 1
    this._updatePagination(this.currPage, this.maxPage)
  }

  openPrevPage() {
    this.currPage--
    if (this.currPage === 0) {
      this.currPage = 1
    }
    this._updatePagination(this.currPage, this.maxPage)
  }

  openNextPage() {
    this.currPage++
    if (this.currPage === this.maxPage + 1) {
      this.currPage = this.maxPage
    }
    this._updatePagination(this.currPage, this.maxPage)
  }

  openLastPage() {
    this.currPage = this.maxPage
    this._updatePagination(this.currPage, this.maxPage)
  }
}


export { Pagination }
