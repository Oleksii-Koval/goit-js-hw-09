const selectors = {
    bodyEl: document.querySelector("body"),
    startBtnEl: document.querySelector("[data-start]"),
    stopBtnEl: document.querySelector("[data-stop]"),
}

selectors.startBtnEl.addEventListener("click", handlerStart);
selectors.stopBtnEl.addEventListener("click", handlerStop);

function handlerStart() {
    onStart();
    return changeBackground = setInterval(() => {
        selectors.bodyEl.style.backgroundColor = getRandomHexColor()
    }, 1000)
}

function handlerStop() {
    onStop();
    clearInterval(changeBackground)
}

function onStart() {
    selectors.startBtnEl.disabled = true;
    selectors.stopBtnEl.disabled = false;
}

function onStop() {
    selectors.startBtnEl.disabled = false;
    selectors.stopBtnEl.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}