const selectors = {
    bodyEl: document.querySelector("body"),
    startBtnEl: document.querySelector("[data-start]"),
    stopBtnEl: document.querySelector("[data-stop]"),
}

selectors.startBtnEl.addEventListener("click", handlerStart);
selectors.stopBtnEl.addEventListener("click", handlerStop);
let changeBackground = null;
function handlerStart() {
    btnToggle(true);
    changeBackground = setInterval(() => {
        selectors.bodyEl.style.backgroundColor = getRandomHexColor()
    }, 1000)
    return changeBackground;
}

function handlerStop() {
    btnToggle(false);
    clearInterval(changeBackground)
}

function btnToggle(isEnable) {
    selectors.startBtnEl.disabled = isEnable;
    selectors.stopBtnEl.disabled = !isEnable;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}