class Menu {
  constructor() {
    this.button = document.getElementById(`menu-button`)
    this.nav = document.getElementById(`header-nav`)
    this.menu = document.getElementById(`main-menu`)
    this.isOpen = false

    this._initListeners()
  }
  
  _initListeners() {
    this.button?.addEventListener(`click`, () => {
      this._toggleNav()
    })

    this.nav && (this.backdrop = document.querySelector(`.header-nav__backdrop`))
    this.backdrop?.addEventListener(`click`, () => {
      this._toggleNav()
    })

    this.menu?.addEventListener(`click`, (e) => {
      if (e.target.classList.contains(`main-menu__link`)) {
        this._toggleNav()
      }
    })
  }

  _disableScroll() {
    document.body.style.overflow = `hidden`
  }

  _enableScroll() {
    document.body.style.overflow = `visible`
  }

  _toggleNav() {
    this.isOpen = !this.isOpen

    this.isOpen ? this._disableScroll() : this._enableScroll()
    this.button.classList.toggle(`menu-button--open`)
    this.nav.classList.toggle(`header-nav--open`)
  }
}


export { Menu }
