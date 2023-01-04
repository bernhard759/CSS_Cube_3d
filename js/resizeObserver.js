(function () {

    /* Resize Observer object */
    const observer = new ResizeObserver(entries => {
        entries.forEach(entry => {
            /* Cube size is half the container div size so we divide by 4 */
            entry.target.querySelector(".front").style.transform = `translateZ(${entry.contentRect.width / 4}px)`;
            entry.target.querySelector(".back").style.transform = `rotateX(180deg) translateZ(${entry.contentRect.width / 4}px)`;
            entry.target.querySelector(".left").style.transform = `rotateY(-90deg) translateZ(${entry.contentRect.width / 4}px)`;
            entry.target.querySelector(".right").style.transform = `rotateY(90deg) translateZ(${entry.contentRect.width / 4}px)`;
            entry.target.querySelector(".top").style.transform = `rotateX(90deg) translateZ(${entry.contentRect.width / 4}px)`;
            entry.target.querySelector(".bot").style.transform = `rotateX(-90deg) translateZ(${entry.contentRect.width / 4}px)`;
        })
    })

    /* Observe */
    observer.observe(document.querySelector(".cube-div"));

})();