(function () {

    const cubeDiv = document.querySelector("div.cube-div");
    const translateRatio = cubeDiv.getBoundingClientRect().width / 138;
    console.log(translateRatio)
    /* Resize Observer object */

    const observer = new ResizeObserver(entries => {
        entries.forEach(entry => {
            entry.target.querySelector(".front").style.transform = `translateZ(${entry.contentRect.width / translateRatio}px)`;
            entry.target.querySelector(".back").style.transform = `rotateX(180deg) translateZ(${entry.contentRect.width / translateRatio}px)`;
            entry.target.querySelector(".left").style.transform = `rotateY(-90deg) translateZ(${entry.contentRect.width / translateRatio}px)`;
            entry.target.querySelector(".right").style.transform = `rotateY(90deg) translateZ(${entry.contentRect.width / translateRatio}px)`;
            entry.target.querySelector(".top").style.transform = `rotateX(90deg) translateZ(${entry.contentRect.width / translateRatio}px)`;
            entry.target.querySelector(".bot").style.transform = `rotateX(-90deg) translateZ(${entry.contentRect.width / translateRatio}px)`;
        })
    })

    /* Observe */
    observer.observe(document.querySelector(".cube-div"));

})();