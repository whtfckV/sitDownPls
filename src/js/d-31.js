const sofaSwiperBottom = new Swiper('#sofaSwiperBottom', {
  slidesPerView: 'auto',
  spaceBetween: 38,
  direction: 'horizontal',
  breakpoints: {
    577: {
      spaceBetween: 16,
      direction: 'vertical'
    },
    850: {
      spaceBetween: 38,
      direction: 'horizontal'
    },
  }
});

const sofaSwiperTop = new Swiper('#sofaSwiperTop', {
  effect: 'fade',
  thumbs: {
    swiper: sofaSwiperBottom
  },
});

const similarSwiper = new Swiper('#similarSwiper', {
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 16,
  navigation: {
    nextEl: '.similar__btn-next',
    prevEl: '.similar__btn-prev',
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
      slidesPerGroup: 1,
      spaceBetween: 32
    },
    850: {
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 32
    },
    1200: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 32
    },
  },
})

const sofaSwiperBottomModal = new Swiper('#sofaSwiperBottomModal', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 78,
  navigation: {
    nextEl: '.swiper-bottom-modal__btn-next',
    prevEl: '.swiper-bottom-modal__btn-prev',
  },
  breakpoints: {
    576: {
      slidesPerView: 'auto',
      slidesPerGroup: 2,
    },
    850: {
      slidesPerView: 'auto',
      slidesPerGroup: 2,
    },
    1200: {
      slidesPerView: 'auto',
    },
  }
});

const validation = new JustValidate(
  '#buyForm',
  {
    errorFieldCssClass: 'is-invalid',
    errorLabelCssClass: 'is-label-invalid',
    successFieldCssClass: 'is-success',
  },
);

const buyModal = document.querySelector('#buyModal');

validation
  .addField('#name', [
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Слишком короткое имя',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Слишком длинное имя',
    },
    {
      rule: 'customRegexp',
      value: /^[a-zA-Zа-яА-Я]+$/,
      errorMessage: 'Недопустимый формат',
    },
  ])
  .addField('#tel', [
    {
      rule: 'required',
      errorMessage: 'Введите телефон'
    },
    {
      validator: () => {
        const phone = selector.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
      errorMessage: 'Номер телефона слишком короткий'
    },
  ])
  .onSuccess((event) => {
    let formData = new FormData(event.target);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          formSendSuccess();
        };
      };
    };

    xhr.open('POST', '../libs/phpmailer/send.php', true);
    xhr.send(formData);

    event.target.reset();
  });

// modal swiper
const sofaSwiperTopModal = new Swiper('#sofaSwiperTopModal', {
  effect: 'fade',
  thumbs: {
    swiper: sofaSwiperBottomModal
  },
})
const sofaModal = document.querySelector('#sofaModal');
const sofaModalClose = document.querySelector('#sofaModalClose');
const sofaSwiperTopImages = document.querySelectorAll('.swiper-top__img')

sofaSwiperTopImages.forEach(img => {
  img.onclick = () => {
    sofaModal.classList.add('sofa-modal--active');
  }
})

sofaModalClose.onclick = () => {
  sofaModal.classList.remove('sofa-modal--active')
}

// modal buy in one click
const buttonBuy = document.querySelector('#buy');
const buyModalClose = document.querySelector('#buyModalClose');

buttonBuy.onclick = () => {
  buyModal.classList.add('buy-modal--active');
}

buyModalClose.onclick = () => {
  buyModal.classList.remove('buy-modal--active')
}



