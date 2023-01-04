(function () {
  /* Config */
  let counter = 0;
  const updateRate = 10;

  /* HTML elements */
  const cubeDiv = document.querySelector(".cube-div");
  const cube = cubeDiv.querySelector(".cube");
  const animationSwitch = document.querySelector("#animation-switch");
  const mouseMoveSwitch = document.querySelector("#mouse-move-switch");
  const backfaceCheckbox = document.querySelector("#backface");
  const coordsCheckbox = document.querySelector("#coords");
  const coordsDiv = document.querySelector("div.coords");
  const radioText = document.querySelector("div.form-check #option-text");
  const radioNumbers = document.querySelector("div.form-check #option-numbers");
  const radioDice = document.querySelector("div.form-check #option-dice");

  /* Radiobuttons Eventlisteners */
  radioText?.addEventListener("change", function (e) {
    cube.classList.remove(cube.classList.item(1));
    cube.classList.add("text");
  });
  radioNumbers?.addEventListener("change", function (e) {
    cube.classList.remove(cube.classList.item(1));
    cube.classList.add("numbers");
  });
  radioDice?.addEventListener("change", function (e) {
    cube.classList.remove(cube.classList.item(1));
    cube.classList.add("dice");
  });

  /* Add Eventlistener to start animation */
  animationSwitch.addEventListener("change", function () {
    //console.log(animationSwitch.checked);
    if (animationSwitch.checked) {
      cube.style.animation = "rotate 10s linear infinite";
    } else {
      cube.style.animation = "none";
    }
  });

  /* Add Eventlistener for mouse move */
  mouseMoveSwitch.addEventListener("change", function () {
    //console.log(animationSwitch.checked);
    if (mouseMoveSwitch.checked) {
      coordsCheckbox.disabled = false;
    } else {
      coordsCheckbox.disabled = true;
    }
  });

  /* Add Eventlistener for backface visibility */
  backfaceCheckbox.addEventListener("change", function () {
    //console.log(backfaceCheckbox.checked);
    cube.querySelectorAll(".side")?.forEach((side) => {
      if (backfaceCheckbox.checked) {
        side.style.backfaceVisibility = "visible";
      } else {
        side.style.backfaceVisibility = "hidden";
      }
    });
  });

  /* Add Eventlistener for coords div */
  coordsCheckbox.addEventListener("change", function () {
    if (!coordsCheckbox.checked) {
      coordsDiv.style.display = "none";
    }
  });

  /* Mouse object */
  const mouse = {
    centerX: 0,
    centerY: 0,
    x: 0,
    y: 0,
    updatePosition: function (event) {
      this.x = event.clientX - this.centerX;
      this.y = -(event.clientY - this.centerY);
    },
    setCenter: function (element) {
      this.centerX = element.offsetLeft + Math.floor(element.offsetWidth / 2);
      this.centerY = element.offsetTop + Math.floor(element.offsetHeight / 2);
    },
  };
  mouse.setCenter(cubeDiv);

  /* Mouse enter */
  function onMouseEnter(event) {
    if (mouseMoveSwitch.checked) {
      mouse.setCenter(cubeDiv);
      cube.style.animation = "none"; // stop animation
    }
  }

  /* Mouse leave */
  function onMouseLeave() {
    if (mouseMoveSwitch.checked) {
      cube.style.transform = "translateZ(10px)";
      if (animationSwitch.checked) {
        window.setTimeout(
          () => (cube.style.animation = "rotate 10s linear infinite"),
          400
        );
      }
    }
  }

  /* Mouse move */
  function onMouseMove(event) {
    /* Throttle update */
    if (Number.isInteger(counter++ / updateRate)) {
      if (mouseMoveSwitch.checked) {
        mouse.updatePosition(event);
        cube.style.transform = `rotateX(${(mouse.y / 10).toFixed(2)}deg) 
                 rotateY(${(mouse.x / 10).toFixed(2)}deg) translateZ(10px)`;
        if (coordsCheckbox.checked) {
          coordsDiv.firstChild.textContent = `${mouse.x}, ${mouse.y}`;
          coordsDiv.style.display = "block";
        }
      }
    }
  }

  /* Add Eventlisteners */
  cubeDiv.addEventListener("mouseenter", onMouseEnter);
  cubeDiv.addEventListener("mousemove", onMouseMove);
  cubeDiv.addEventListener("mouseleave", onMouseLeave);
})();
