const region = new Choices(document.querySelector('#region'), {
  removeItems: true,
  allowHTML: false,
  duplicateItemsAllowed: false,
  paste: false,
  searchEnabled: false,
  position: 'bottom',
  itemSelectText: '',
  classNames: {
    containerOuter: 'choices region__choices',
    containerInner: 'choices__inner region__inner',
    listSingle: 'choices__list--single region__list--single',
  }
});

const category = new Choices(document.querySelector('#category'), {
  removeItems: false,
  allowHTML: false,
  duplicateItemsAllowed: false,
  paste: false,
  searchEnabled: false,
  position: 'bottom',
  itemSelectText: '',
  classNames: {
    containerOuter: 'choices search__choices',
    containerInner: 'choices__inner search__inner',
    listSingle: 'choices__list--single search__list--single',
  }
});

const heroSwiper = new Swiper('#heroSwiper', {
  loop: true,
  effect: 'fade',
  speed: 1000,
  autoHeight: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: '.hero__pagination',
    type: 'bullets',
    clickable: true,
  },
});

// UI поиска
const input = document.querySelector('.search__input');
const wrap = document.querySelector('.search__wrap');
const icon = document.querySelector('.search__icon');

input.onmouseover = input.onmouseout = hover;
input.onfocus = input.onblur = focusAndInput;

function hover(event) {
  if (event.type == 'mouseover') {
    wrap.classList.add('is-hover');
  };

  if (event.type == 'mouseout') {
    wrap.classList.remove('is-hover');
  };
};

function focusAndInput(event) {
  console.log(event.target.value);
  if (event.type == 'focus') {
    wrap.classList.add('is-focus');
    input.oninput = function() {
      icon.classList.add('no-empty');
      if (input.value.length == 0) {
        icon.classList.remove('no-empty');
      }
    };
  };

  if (event.type == 'blur') {
    wrap.classList.remove('is-focus');
  };
};

// burger & info
const btn = document.querySelector('.toggle');
const menu = document.querySelector('.nav');
const info = document.querySelector('.info');

btn.onclick = function() {
  this.classList.toggle('is-open');
  this.classList.toggle('is-close');
  menu.classList.toggle('open');
  info.classList.toggle('info-mobile-opening');
};
