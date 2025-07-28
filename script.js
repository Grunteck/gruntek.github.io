// Анимация чисел
const counters = document.querySelectorAll('.number');
counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
        if (current < target) {
            counter.innerText = Math.ceil(current);
            current += increment;
            setTimeout(updateCounter, 20);
        } else {
            counter.innerText = target;
        }
    };
    updateCounter();
});