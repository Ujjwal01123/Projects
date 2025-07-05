const no1=document.getElementById("no1")
const no2=document.getElementById("no2")
const no3=document.getElementById("no3")
const no4=document.getElementById("no4")
const no5=document.getElementById("no5")
const no6=document.getElementById("no6")

const yes1=document.getElementById("yes1")
const yes2=document.getElementById("yes2")
const yes3=document.getElementById("yes3")
const yes4=document.getElementById("yes4")
const yes5=document.getElementById("yes5")
const yes6=document.getElementById("yes6")

const level=document.getElementById("lev")
let globalvalue=0;

const btn=document.getElementById("btn")

yes1.addEventListener("click",()=>{
    globalvalue=globalvalue+40;
    // console.log(globalvalue)
    level.style.height=`${globalvalue}px`;
    level.style.width=`100%`;
    level.style.backgroundImage="linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgb(42, 39, 131) 93.2% )"
    level.style.overflow="hidden"
    yes1.disabled=true
    no1.disabled=true
    yes1.style.backgroundImage="linear-gradient( 111.4deg,  rgb(43, 43, 48) 6.5%, rgb(80, 79, 97) 93.2% )"
    no1.style.backgroundImage="linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgb(60, 60, 68) 93.2% )"
})
yes2.addEventListener("click",()=>{
    globalvalue=globalvalue+40;
    // console.log(globalvalue)
    level.style.height=`${globalvalue}px`;
    level.style.width=`100%`;
    level.style.backgroundImage="linear-gradient( 104.1deg,  rgba(0,61,100,1) 13.6%, rgba(47,127,164,1) 49.4%, rgba(30,198,198,1) 93.3% )"
    level.style.overflow="hidden"
    yes2.disabled=true
    no2.disabled=true
    yes2.style.backgroundImage="linear-gradient( 111.4deg,  rgb(43, 43, 48) 6.5%, rgb(80, 79, 97) 93.2% )"
    no2.style.backgroundImage="linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgb(60, 60, 68) 93.2% )"
})
yes3.addEventListener("click",()=>{
    globalvalue=globalvalue+40;
    // console.log(globalvalue)
    level.style.height=`${globalvalue}px`;
    level.style.width=`100%`;
    level.style.backgroundImage="linear-gradient( 111.9deg,  rgba(255,255,169,1) 0.2%, rgba(255,208,120,1) 14.1%, rgba(255,156,94,1) 27.4%, rgba(251,99,95,1) 41.4%, rgba(226,28,114,1) 55.8%, rgba(176,0,140,1) 70.2%, rgba(83,0,166,1) 84.1% )"
    level.style.overflow="hidden"
    yes3.disabled=true
    no3.disabled=true
    yes3.style.backgroundImage="linear-gradient( 111.4deg,  rgb(43, 43, 48) 6.5%, rgb(80, 79, 97) 93.2% )"
    no3.style.backgroundImage="linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgb(60, 60, 68) 93.2% )"
})
yes4.addEventListener("click",()=>{
    globalvalue=globalvalue+40;
    // console.log(globalvalue)
    level.style.height=`${globalvalue}px`;
    level.style.width=`100%`;
    level.style.backgroundImage="radial-gradient( circle 382px at 50% 50.2%,  rgba(73,76,212,1) 0.1%, rgba(3,1,50,1) 100.2% )"
    level.style.overflow="hidden"
    yes4.disabled=true
    no4.disabled=true
    yes4.style.backgroundImage="linear-gradient( 111.4deg,  rgb(43, 43, 48) 6.5%, rgb(80, 79, 97) 93.2% )"
    no4.style.backgroundImage="linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgb(60, 60, 68) 93.2% )"
})
yes5.addEventListener("click",()=>{
    globalvalue=globalvalue+40;
    // console.log(globalvalue)
    level.style.height=`${globalvalue}px`;
    level.style.width=`100%`;
    level.style.backgroundImage="linear-gradient( 109.9deg,  rgba(0,174,182,1) 4.5%, rgba(190,223,224,1) 22.6%, rgba(217,198,225,1) 45.1%, rgba(248,178,54,1) 68.5%, rgba(235,105,17,1) 87.2% )"
    level.style.overflow="hidden"
    yes5.disabled=true
    no5.disabled=true
    yes5.style.backgroundImage="linear-gradient( 111.4deg,  rgb(43, 43, 48) 6.5%, rgb(80, 79, 97) 93.2% )"
    no5.style.backgroundImage="linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgb(60, 60, 68) 93.2% )"
})
yes6.addEventListener("click",()=>{
    globalvalue=globalvalue+40;
    // console.log(globalvalue)
    level.style.height=`${globalvalue}px`;
    level.style.width=`100%`;
    level.style.backgroundImage="linear-gradient( 226.4deg,  rgba(255,26,1,1) 28.9%, rgba(254,155,1,1) 33%, rgba(255,241,0,1) 48.6%, rgba(34,218,1,1) 65.3%, rgba(0,141,254,1) 80.6%, rgba(113,63,254,1) 100.1% )"
    level.style.overflow="hidden"
    yes6.disabled=true
    no6.disabled=true
    yes6.style.backgroundImage="linear-gradient( 111.4deg,  rgb(43, 43, 48) 6.5%, rgb(80, 79, 97) 93.2% )"
    no6.style.backgroundImage="linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgb(60, 60, 68) 93.2% )"
})
no1.addEventListener("click",()=>{
    if(globalvalue==0){
        globalvalue=globalvalue
    }
    else{
        globalvalue=globalvalue-40;
        level.style.height=`${globalvalue}px`;
        level.style.width=`100%`;
        level.style.backgroundImage="linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgb(42, 39, 131) 93.2% )"
        level.style.overflow="hidden"
    }
    yes1.disabled=true
    no1.disabled=true
    yes1.style.backgroundImage="linear-gradient( 111.4deg,  rgb(43, 43, 48) 6.5%, rgb(80, 79, 97) 93.2% )"
    no1.style.backgroundImage="linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgb(60, 60, 68) 93.2% )"
})
no2.addEventListener("click",()=>{
    if(globalvalue==0){
        globalvalue=globalvalue
    }
    else{
        globalvalue=globalvalue-40;
        level.style.height=`${globalvalue}px`;
        level.style.width=`100%`;
        level.style.backgroundImage="linear-gradient( 104.1deg,  rgba(0,61,100,1) 13.6%, rgba(47,127,164,1) 49.4%, rgba(30,198,198,1) 93.3% )"
        level.style.overflow="hidden"
    }
    yes2.disabled=true
    no2.disabled=true
    yes2.style.backgroundImage="linear-gradient( 111.4deg,  rgb(43, 43, 48) 6.5%, rgb(80, 79, 97) 93.2% )"
    no2.style.backgroundImage="linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgb(60, 60, 68) 93.2% )"
})
no3.addEventListener("click",()=>{
    if(globalvalue==0){
        globalvalue=globalvalue
    }
    else{
        globalvalue=globalvalue-40;
        level.style.height=`${globalvalue}px`;
        level.style.width=`100%`;
        level.style.backgroundImage="linear-gradient( 111.9deg,  rgba(255,255,169,1) 0.2%, rgba(255,208,120,1) 14.1%, rgba(255,156,94,1) 27.4%, rgba(251,99,95,1) 41.4%, rgba(226,28,114,1) 55.8%, rgba(176,0,140,1) 70.2%, rgba(83,0,166,1) 84.1% )"
        level.style.overflow="hidden"
    }
    yes3.disabled=true
    no3.disabled=true
    yes3.style.backgroundImage="linear-gradient( 111.4deg,  rgb(43, 43, 48) 6.5%, rgb(80, 79, 97) 93.2% )"
    no3.style.backgroundImage="linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgb(60, 60, 68) 93.2% )"
})
no4.addEventListener("click",()=>{
    if(globalvalue==0){
        globalvalue=globalvalue
    }
    else{
        globalvalue=globalvalue-40;
        level.style.height=`${globalvalue}px`;
        level.style.width=`100%`;
        level.style.backgroundImage="radial-gradient( circle 602px at 2.1% 5.1%,  rgba(233,0,120,1) 0%, rgba(0,0,0,1) 90.1% )"
        level.style.overflow="hidden"
    }
    yes4.disabled=true
    no4.disabled=true
    yes4.style.backgroundImage="linear-gradient( 111.4deg,  rgb(43, 43, 48) 6.5%, rgb(80, 79, 97) 93.2% )"
    no4.style.backgroundImage="linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgb(60, 60, 68) 93.2% )"
})
no5.addEventListener("click",()=>{
    if(globalvalue==0){
        globalvalue=globalvalue
    }
    else{
        globalvalue=globalvalue-40;
        level.style.height=`${globalvalue}px`;
        level.style.width=`100%`;
        level.style.backgroundImage="linear-gradient( 109.9deg,  rgba(0,174,182,1) 4.5%, rgba(190,223,224,1) 22.6%, rgba(217,198,225,1) 45.1%, rgba(248,178,54,1) 68.5%, rgba(235,105,17,1) 87.2% )"
        level.style.overflow="hidden"
    }
    yes5.disabled=true
    no5.disabled=true
    yes5.style.backgroundImage="linear-gradient( 111.4deg,  rgb(43, 43, 48) 6.5%, rgb(80, 79, 97) 93.2% )"
    no5.style.backgroundImage="linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgb(60, 60, 68) 93.2% )"
})
no6.addEventListener("click",()=>{
    if(globalvalue==0){
        globalvalue=globalvalue
    }
    else{
        globalvalue=globalvalue-40;
        level.style.height=`${globalvalue}px`;
        level.style.width=`100%`;
        level.style.backgroundImage="linear-gradient( 226.4deg,  rgba(255,26,1,1) 28.9%, rgba(254,155,1,1) 33%, rgba(255,241,0,1) 48.6%, rgba(34,218,1,1) 65.3%, rgba(0,141,254,1) 80.6%, rgba(113,63,254,1) 100.1% )"
        level.style.overflow="hidden"
    }
    yes6.disabled=true
    no6.disabled=true
    yes6.style.backgroundImage="linear-gradient( 111.4deg,  rgb(43, 43, 48) 6.5%, rgb(80, 79, 97) 93.2% )"
    no6.style.backgroundImage="linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgb(60, 60, 68) 93.2% )"
})

const boxmode=document.getElementById("boxmode")
const mainbox=document.getElementById("mainbox")
const resValue=document.getElementById("resValue")
btn.addEventListener("click",()=>{
    const result=`${(globalvalue/240)*100}%`;
    resValue.innerText=result
    btn.innerText="please wait...."
    setTimeout(() => {
        boxmode.classList.remove("hide")
        mainbox.classList.add("hide")    
    }, 1000);
})


const okay=document.getElementById("okay")
okay.addEventListener("click",()=>{
    okay.innerText="please wait.."
    setTimeout(() => {
        window.location.reload("C:\Users\ASUS\OneDrive\Desktop\code\projects\joke danger meter\index.html")
    }, 1500);
})