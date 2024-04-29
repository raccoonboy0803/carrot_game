export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.popUp');
    this.popUpText = document.querySelector('.popUpMessage');
    this.popUpRefresh = document.querySelector('.popUpRefresh');
    this.popUpRefresh.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUpText.innerText = text;
    this.popUp.classList.remove('popUp--hide');
  }

  hide() {
    this.popUp.classList.add('popUp--hide');
  }
}
