(function () {
  /* Animation frame config */
  let posX,
    posY = 0;
  let ticking = false;
  let counter = 0;

  /* HTML elements */
  const cubeDiv = document.querySelector(".cube-div");
  const cube = cubeDiv.querySelector(".cube");
  const animationSwitch = document.querySelector("#animation-switch");
  const pointerMoveSwitch = document.querySelector("#pointer-move-switch");
  const backfaceCheckbox = document.querySelector("#backface");
  const coordsCheckbox = document.querySelector("#coords");
  const coordsDiv = document.querySelector("div.coords");
  const radioText = document.querySelector("div.form-check #option-text");
  const radioNumbers = document.querySelector("div.form-check #option-numbers");
  const radioDice = document.querySelector("div.form-check #option-dice");

  /* Create pointer position point */
  const pointerPoint = document.createElement("span");
  pointerPoint.style.cssText +=
    `display: none; position: absolute; background-color: firebrick; border-radius: 100%; width: 0.5em; height: 0.5em; top: calc(50% - 0.25em); left: calc(50% - 0.25em);`;
  cubeDiv.appendChild(pointerPoint);

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

  /* Add Eventlistener for pointer move */
  pointerMoveSwitch.addEventListener("change", function () {
    //console.log(animationSwitch.checked);
    if (pointerMoveSwitch.checked) {
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

  /* Pointer object */
  const pointer = {
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
  pointer.setCenter(cubeDiv);

  /** Pointer enter */
  function onPointerEnter(event) {
    if (pointerMoveSwitch.checked) {
      pointer.setCenter(cubeDiv);
      cube.style.animation = "none"; // stop animation
    }
  }

  /** Pointer move */
  function onPointerMove(event) {
    console.log(event);
    pointer.updatePosition(event);
    posX = pointer.x;
    posY = pointer.y;
    if (!ticking && pointerMoveSwitch.checked) {
      window.requestAnimationFrame(() => {
        pointerPoint.style.display = "block";
        pointerPoint.style.transform = `translate(${posX}px, ${-1 * posY}px)`;
        ticking = false;
      });
      ticking = true;
    }
    if (counter++ % 8 == 0) {
      changeCubeTranslate(posX, posY);
    }
  }

  /** Pointer leave */
  function onPointerLeave() {
    if (pointerMoveSwitch.checked) {
      pointerPoint.style.display = "none";
      cube.style.transform = "translateZ(0px)";
      if (animationSwitch.checked) {
        window.setTimeout(
          () => (cube.style.animation = "rotate 10s linear infinite"),
          400
        );
      }
    }
  }

  /** Change cube translation values */
  function changeCubeTranslate(x, y) {
    if (pointerMoveSwitch.checked) {
      cube.style.transform = `rotateX(${(y / 10).toFixed(2)}deg) 
             rotateY(${(x / 10).toFixed(2)}deg) translateZ(10px)`;
      if (coordsCheckbox.checked) {
        coordsDiv.firstChild.textContent = `${x.toFixed(0)}, ${y.toFixed(0)}`;
        coordsDiv.style.display = "block";
      }
    }
  }

  /* Add Eventlisteners */
  cubeDiv.addEventListener("pointerenter", onPointerEnter);
  cubeDiv.addEventListener("pointermove", onPointerMove);
  cubeDiv.addEventListener("pointerleave", onPointerLeave);
})();
