const heroSwiper = new Swiper('#heroSwiper', {
  loop: true,
  effect: 'fade',
  speed: 2000,
  autoHeight: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: ".hero__pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<svg class="'+ className +' hero__bullet bullet" width="20" height="20" viewBox="0 0 20 20">'
      + '<circle class="bullet__bg" r="8" cx="10" cy="10" fill="none" stroke-width="2" />'
      + '<circle class="bullet__progress" r="8" cx="10" cy="10" fill="none" stroke-width="2" />'
      + '</svg>';
    },
  },
});

/*
let bullets = document.querySelectorAll('.swiper-pagination-bullet')

heroSwiper.on('slideChangeTransitionEnd', () => {
  bullets.forEach(bullet => {
    if(bullet.classList.contains('swiper-pagination-bullet-active')) bullet.classList.add('bullet-animate')
  })
})

heroSwiper.on('slideChangeTransitionStart', () => {
  bullets.forEach(bullet => {
    bullet.classList.remove('bullet-animate')
  })
})
*/

const specialSwiper = new Swiper('#specialSwiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 12,
  navigation: {
    nextEl: '.special__btn-next',
    prevEl: '.special__btn-prev',
  },
  breakpoints: {
    610: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 32
    },
    970: {
      slidesPerView: 'auto',
      slidesPerGroup: 3,
      spaceBetween: 32
    },
    1300: {
      slidesPerView: 'auto',
      slidesPerGroup: 3,
      spaceBetween: 32
    },
  },
})

const usefulSwiper = new Swiper('#usefulSwiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 12,
  navigation: {
    nextEl: '.useful__btn-next',
    prevEl: '.useful__btn-prev',
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
      slidesPerView: 2,
      slidesPerGroup: 1,
      spaceBetween: 32
    },
  },
})

const validation = new JustValidate(
  '#feedback',
  {
    errorFieldCssClass: 'is-invalid',
    errorLabelCssClass: 'is-label-invalid',
    successFieldCssClass: 'is-success',
  },
);

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
  .addField('#mail', [
    {
      rule: 'email',
      errorMessage: 'Некорректный E-mail'
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

// card show more
const btnMore = document.querySelector('#btnMore');
const cardList = document.querySelector('.high-rating__list');
const cards = document.querySelectorAll('.high-rating__item');

btnMore.onclick = () => {
  cards.forEach(card => {
    card.style.display = 'flex';
  })
  cardList.classList.add('full');
}
