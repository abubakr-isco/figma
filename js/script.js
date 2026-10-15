// ===== Аккордеон «Our Working Process» =====
const steps = document.querySelectorAll('.step');

steps.forEach((step) => {
  const head = step.querySelector('.step__head');

  head.addEventListener('click', () => {
    const isOpen = step.classList.contains('step--open');

    // Открытым может быть только один этап
    steps.forEach((item) => {
      item.classList.remove('step--open');
      item.querySelector('.step__head').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      step.classList.add('step--open');
      head.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===== Слайдер отзывов =====
const slides = document.querySelectorAll('.review');
const dots = document.querySelectorAll('.slider__dot');
const prevButton = document.querySelector('.slider__arrow--prev');
const nextButton = document.querySelector('.slider__arrow--next');

const SLIDE_STEP = 656; // ширина отзыва 606px + отступ 50px
let current = 0;
let positions = [];

function renderSlider() {
  slides.forEach((slide, index) => {
    // Смещение относительно активного слайда: от -2 до 2 (по кругу)
    const offset = ((index - current + slides.length + 2) % slides.length) - 2;

    // Без анимации: при первой отрисовке и для слайда, который перепрыгивает с края на край
    const jump = positions[index] === undefined || Math.abs(positions[index] - offset) > 1;
    slide.style.transition = jump ? 'none' : '';
    slide.style.transform = `translateX(${offset * SLIDE_STEP}px)`;
    positions[index] = offset;
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('slider__dot--active', index === current);
  });

  prevButton.disabled = current === 0;
  nextButton.disabled = current === slides.length - 1;
}

prevButton.addEventListener('click', () => {
  if (current > 0) {
    current -= 1;
    renderSlider();
  }
});

nextButton.addEventListener('click', () => {
  if (current < slides.length - 1) {
    current += 1;
    renderSlider();
  }
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    current = index;
    renderSlider();
  });
});

renderSlider();
