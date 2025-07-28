// Улучшенная анимация чисел с эффектами
function animateNumbers() {
  const counters = document.querySelectorAll('.number');
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-count');
        const duration = 2000; // Продолжительность анимации в ms
        const startTime = performance.now();
        const suffix = counter.getAttribute('data-suffix') || '';
        const prefix = counter.getAttribute('data-prefix') || '';
        const easing = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Квадратичное easing

        const animate = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const easedProgress = easing(progress);
          const currentValue = Math.floor(easedProgress * target);
          
          counter.textContent = prefix + currentValue + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            // Добавляем небольшую вибрацию при завершении
            counter.style.transform = 'scale(1.1)';
            setTimeout(() => {
              counter.style.transform = 'scale(1)';
            }, 200);
          }
        };

        requestAnimationFrame(animate);
        observer.unobserve(counter);
      }
    });
  }, options);

  counters.forEach(counter => {
    observer.observe(counter);
    // Добавляем "+" перед числом если нужно
    if (counter.classList.contains('plus')) {
      counter.setAttribute('data-prefix', '+');
    }
    // Добавляем "%" после числа если нужно
    if (counter.classList.contains('percent')) {
      counter.setAttribute('data-suffix', '%');
    }
  });
}

// Запускаем анимацию при загрузке страницы
document.addEventListener('DOMContentLoaded', animateNumbers);

// Дополнительно: перезапуск анимации при изменении размера окна
window.addEventListener('resize', () => {
  const counters = document.querySelectorAll('.number');
  counters.forEach(counter => {
    counter.textContent = counter.getAttribute('data-prefix') || '';
  });
  setTimeout(animateNumbers, 100);
});
