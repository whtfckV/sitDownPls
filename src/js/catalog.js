const rangeSlider = document.querySelector(".group__slider");
const fieldNumberFirst = document.querySelector(".range-wrapper__field_first");
const fieldNumberSecond = document.querySelector(".range-wrapper__field_second");
const allFields = [fieldNumberFirst, fieldNumberSecond];

if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [2000, 150000],
    connect: true,
    step: 1,
    range: {
      min: 2000,
      max: 150000
    }
  });

  rangeSlider.noUiSlider.on("update", (values, handle) => {
    allFields[handle].value = Math.round(values[handle]);
  });

  const setRangeSlider = (i, value) => {
    let array = [null, null];
    array[i] = value;
    rangeSlider.noUiSlider.set(array);
  };

  allFields.forEach((el, index) => {
    el.addEventListener("change", (e) => {
      setRangeSlider(index, e.currentTarget.value);
    });
  });
}

const catalogSwiper = new Swiper('#catalogSwiper', {
  slidesPerView: 2,
  grid: {
    rows: 3,
    fill: 'row'
  },
  slidesPerGroup: 2,
  spaceBetween: 16,
  pagination: {
    el: ".catalog__pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
  breakpoints: {
    851: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 32
    },
  },
})

// dropdown
const dropBtn = document.querySelectorAll('.group__drop');
const items = document.querySelectorAll('.drop-item');

dropBtn.forEach(function(i) {
  i.addEventListener('click', function() {
    let thisBtn = this;
    let thisDrop = this.parentElement.querySelector('.drop-item');

    dropBtn.forEach(el => {
        if(el != thisBtn) el.classList.remove('group__drop-active');
      }
    );

    items.forEach(el => {
        if(el != thisDrop) el.classList.remove('drop-item-active')
      }
    );

    thisBtn.classList.toggle('group__drop-active');

    let n = 'true' === thisBtn.getAttribute('aria-expanded');
    thisBtn.setAttribute('aria-expanded', !n),
      n
        ? thisBtn.setAttribute('aria-label', 'открыть список')
        : thisBtn.setAttribute('aria-label', 'закрыть список');

    thisDrop.classList.toggle('drop-item-active')
  })
})
