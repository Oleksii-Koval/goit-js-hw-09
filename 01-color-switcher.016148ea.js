const t={bodyEl:document.querySelector("body"),startBtnEl:document.querySelector("[data-start]"),stopBtnEl:document.querySelector("[data-stop]")};t.startBtnEl.addEventListener("click",(function(){t.startBtnEl.disabled=!0,t.stopBtnEl.disabled=!1;return setInterval((()=>{t.bodyEl.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),t.stopBtnEl.addEventListener("click",(function(){t.startBtnEl.disabled=!1,t.stopBtnEl.disabled=!0,clearInterval(changeBackground)}));
//# sourceMappingURL=01-color-switcher.016148ea.js.map
