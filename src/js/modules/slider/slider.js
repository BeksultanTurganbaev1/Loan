export default class Slider {
    constructor({
        container = null, 
        btns = null, 
        next = null, 
        prev = null,
        activeClass = '',
        animate,
        autoplay } = {}) {
        this.container = document.querySelector(container);
        this.slides = this.newSlides();
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
        this.paused = false;
    }

    newSlides() {
        if (this.container.classList.contains('feed__slider')) {
            this.slides = this.container.children;
            let r = [];
            for (let i = 0; i < this.slides.length - 2; i++) {
                r[i] = this.slides[i];
            }
            return this.slides = r;
        } else {
            return this.slides = this.container.children;
        }
    }
}