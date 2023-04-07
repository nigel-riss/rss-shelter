class Menu {
  constructor() {
    this.button = document.getElementById(`menu-button`)

    this._initListeners()
  }
  
  _initListeners() {
    this.button && this.button.addEventListener(`click`, () => {
      this._toggleNav()
    })
  }

  _toggleNav() {
    this.button.classList.toggle(`menu-button--open`)
  }
}


export { Menu }
