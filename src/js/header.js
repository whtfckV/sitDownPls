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
  if (event.type == 'focus') {
    wrap.classList.add('is-focus');
    input.oninput = function () {
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

btn.onclick = () => {
  btn.classList.toggle('is-open');
  btn.classList.toggle('is-close');
  menu.classList.toggle('open');
  info.classList.toggle('info-mobile-opening');
};
