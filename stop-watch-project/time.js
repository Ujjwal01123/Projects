let hrsplus = document.getElementById("hrsplus");
let hrsminus = document.getElementById("hrsminus");
let minplus = document.getElementById("minplus");
let minminus = document.getElementById("minminus");
let secplus = document.getElementById("secplus");
let secminus = document.getElementById("secminus");
let hrstxt = document.getElementById("hrstxt");
let mintxt = document.getElementById("mintxt");
let sectxt = document.getElementById("sectxt");

let homeid=document.getElementById("homeid");
let toverid=document.getElementById("toverid");

audio=new Audio("audio.mp3");

hrsplus.addEventListener("click", () => {
  if (hrstxt.innerText < 100) {
    hrstxt.innerText = parseInt(hrstxt.innerText) + 1;
  }
});
hrsminus.addEventListener("click", () => {
  if (hrstxt.innerText > 0) {
    hrstxt.innerText = parseInt(hrstxt.innerText) - 1;
  }
});

minplus.addEventListener("click", () => {
  if (mintxt.innerText < 60) {
    mintxt.innerText = parseInt(mintxt.innerText) + 1;
  }
});
minminus.addEventListener("click", () => {
  if (mintxt.innerText > 0) {
    mintxt.innerText = parseInt(mintxt.innerText) - 1;
  }
});

secplus.addEventListener("click", () => {
  if (sectxt.innerText < 60) {
    sectxt.innerText = parseInt(sectxt.innerText) + 1;
  }
});
secminus.addEventListener("click", () => {
  if (sectxt.innerText > 0) {
    sectxt.innerText = parseInt(sectxt.innerText) - 1;
  }
});

function countdown() {
  let hrs = parseInt(hrstxt.innerText);
  let min = parseInt(mintxt.innerText);
  let sec = parseInt(sectxt.innerText);
  if (hrs == 0 && min == 0 && sec == 0) {
    alert(
      "Invalid operation!!!\nSteps to use - \n1. Please set your timer.\n2. Click on the start button."
    );
  } else {
    hrsplus.disabled = true;
    hrsminus.disabled = true;
    minplus.disabled = true;
    minminus.disabled = true;
    secplus.disabled = true;
    secminus.disabled = true;
    let interval = setInterval((e) => {
      if (sec == 0 && min != 0) {
        min = min - 1;
        mintxt.innerText = min;
        sec = 61;
      }
      if (sec == 0 && min == 0 && hrs != 0) {
        hrs = hrs - 1;
        hrstxt.innerText = hrs;
        min = 60;
        mintxt.innerText = min;
        sec = 61;
      }
      if (sec == 1 && min == 0 && hrs == 0) {
        clearInterval(interval);
        audio.play();
        homeid.classList.add("hide");
        toverid.classList.remove("hide");
      }
      sec = sec - 1;
      sectxt.innerText = sec;
    }, 1000);
  }
}
