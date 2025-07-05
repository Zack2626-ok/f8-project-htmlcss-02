// Blog slider

const slider = document.getElementById('slider');
const items = document.querySelectorAll('.blog-list .item');
const dotsContainer = document.querySelector('.blog .dots');


const vinsibleItem = 3; // số lượng hiển thị
const totalItems = items.length;
const totalSteps = totalItems - vinsibleItem + 1;

let currentIndex = 0; //1

// tạo dot tương ứng số bước


for (let i = 0; i < totalSteps; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('data-dot', i);
    dotsContainer.appendChild(dot);
}

const dots = dotsContainer.querySelectorAll('.dot');

function goToSlide(index) {
    const itemWidth = items[0].offsetWidth + 30; // ? margin
    slider.style.transform = `translateX(-${index * itemWidth}px)`;
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add("active");
    currentIndex = index;
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-dot'));
        goToSlide(index);
    })
});

// setInterval(() => {
//     const next = (currentIndex + 1) % totalSteps
//     goToSlide(next)
//     console.log(next);

// }, 2000);