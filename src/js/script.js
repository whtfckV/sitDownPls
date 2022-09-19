let selector = document.querySelector("input[type='tel']");

if (selector != null) {
  let im = new Inputmask("+7 (999) 999-99-99");
  im.mask(selector);
}

// modal success
function formSendSuccess() {
  const modal = document.querySelector('#modalSuccess');
  const close = document.querySelector('#modalClose');

  modal.style.visibility = 'visible';
  setTimeout(() => modal.classList.add('modal-success--active'), 100)

  window.addEventListener('click', event => {
    if (event.target == modal) {
      modal.classList.remove('modal-success--active')
      setTimeout(() => modal.style.visibility = 'hidden', 300)
    }
  })

  close.onclick = () => {
    modal.classList.remove('modal-success--active')
    setTimeout(() => modal.style.visibility = 'hidden', 300)
  }
}
