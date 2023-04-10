import { cards } from '../utils/cards.js'


const FAST_BACKWARD_ID = `fast-backward`
const BACKWARD_ID = `backward`
const FORWARD_ID = `forward`
const FAST_FORWARD_ID = `fast-forward`


class Pagination {
  constructor() {
    this.currPageNum = 1

    this.container = document.getElementById(`all-friends`)
    this.contentContainer = this.container
      ?.querySelector(`.all-friends__content`)
    this.paginationContainer = this.container
      ?.querySelector(`.all-friends__pagination`)

    this._updatePagination(1, 6)
    this._initListeners()
  }

  _initListeners() {
    this.paginationContainer.addEventListener(`click`, (e) => {
      if (e.target.id === FAST_BACKWARD_ID) this.openFirstPage()
      if (e.target.id === BACKWARD_ID) this.openPrevPage()
      if (e.target.id === FORWARD_ID) this.openNextPage()
      if (e.target.id === FAST_FORWARD_ID) this.openLastPage()
    })
  }

  _getControls(pageNum, maxPageNum) {
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
            ${pageNum === maxPageNum && `disabled`}
          >&gt;</button>
        </li>
        <li class="pagination__item">
          <button
            id="${FAST_FORWARD_ID}"
            class="circle-button"
            ${pageNum === maxPageNum && `disabled`}
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

  _updatePagination(pageNum, maxPage) {
    this.paginationContainer.innerHTML = this._getControls(pageNum, maxPage)


    console.log(this.currPageNum)
  }

  openFirstPage() {
    this.currPageNum = 1

    this._updatePagination(this.currPageNum, 6)
  }

  openPrevPage() {
    this.currPageNum--
    if (this.currPageNum === 0) {
      this.currPageNum = 1
    }

    this._updatePagination(this.currPageNum, 6)
  }

  openNextPage() {
    this.currPageNum++
    if (this.currPageNum === 7) {
      this.currPageNum = 6
    }

    this._updatePagination(this.currPageNum, 6)
  }

  openLastPage() {
    this.currPageNum = 6

    this._updatePagination(this.currPageNum, 6)
  }
}


export { Pagination }
