import { cards } from '../utils/cards.js'


class Pagination {
  constructor() {

  }

  _getControls() {
    const controlsHTML = `
      <ul class="pagination">
        <li class="pagination__item">
          <button class="circle-button" disabled>&lt;&lt;</button>
        </li>
        <li class="pagination__item">
          <button class="circle-button" disabled>&lt;</button>
        </li>
        <li class="pagination__item"><span class="pagination__current">1</span></li>
        <li class="pagination__item">
          <button class="circle-button">&gt;</button>
        </li>
        <li class="pagination__item">
          <button class="circle-button">&gt;&gt;</button>
        </li>
      </ul>
    `
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
  }
}
