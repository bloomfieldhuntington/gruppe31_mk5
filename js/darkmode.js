// darkmode.js

// Darkmode Dashboard
const body = document.getElementById("body");
const darkmodeIcon = document.getElementById("dark-mode-icon");


var darkmode = false;


darkmodeIcon.addEventListener("click", () =>{
    if(!darkmode) {
        body.style.backgroundColor = "#444444";
        body.style.color = "#fff";
        darkmodeIcon.style.color = "#ffffff";
        darkmode = true;
    } else {
        body.style.backgroundColor = "#ffffff";
        body.style.color = "#444444";
        darkmodeIcon.style.color = "#000000";
        darkmode = false;
    }
})
