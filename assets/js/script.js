const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


function initBlogSlider(options = {}) {

    const {
        sliderSelector,
        itemSelector,
        dotsSelector,
        visibleItem,
        autoSlide = false,
        autoSlideInterval,
        gap = 30,

    } = options

    const slider = $(sliderSelector);
    const items = $$(itemSelector);
    const dotsContainer = $(dotsSelector);

    if (!slider || items.length === 0 || !dotsContainer) return;

    const totalItems = items.length;
    const totalSteps = totalItems - visibleItem + 1;
    let currentIndex = 0;

    // Tạo dots
    for (let i = 0; i < totalSteps; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('data-dot', i);
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('.dot');

    function goToSlide(index) {
        const itemWidth = items[0].offsetWidth + gap; // gap là margin giữa các item (vì offsetWidth chỉ tính padding + border + content + scroll <nếu có>). CÒN RIÊNG clientWidth chỉ tính phần content + padding
        slider.style.transform = `translateX(-${index * itemWidth}px)`;
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
        currentIndex = index;
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-dot'));
            goToSlide(index);
        });
    });

    if (autoSlide) {
        setInterval(() => {
            const next = (currentIndex + 1) % totalSteps;
            goToSlide(next);
        }, autoSlideInterval);
    }
}

// Gọi hàm khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    initBlogSlider({
        sliderSelector: '#slider',
        itemSelector: '.blog-list .item',
        dotsSelector: '.blog .dots',
        visibleItem: 3,
        autoSlide: true,
        autoSlideInterval: 2000

    });
});