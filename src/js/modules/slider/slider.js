export default class Slider {
    constructor({
        container = null, 
        btns = null, 
        next = null, 
        prev = null,
        activeClass = '',
        animate,
        autoplay,
        moduleNext = null,
        modulePrev = null } = {}) {
        this.container = document.querySelector(container);
        try {this.slides = this.newSlides();} catch(e){}
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
        this.paused = false;
        this.moduleNext = document.querySelectorAll(moduleNext);
        this.modulePrev = document.querySelectorAll(modulePrev);
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