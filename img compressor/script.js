let imginp=document.getElementById("imgs");
let imgcon=document.getElementById("imgbox");
let preview=imgcon.querySelector("img");
let height=document.getElementById("height"),
width=document.getElementById("width");
let ratio=document.getElementById("ratio");
let ratioimg;
let btn=document.getElementById("btn");
let quality=document.getElementById("qual");
let base=document.querySelector("base");

document.addEventListener('contextmenu',event=>{
    event.preventDefault();
}
    
)

const loadFile=(e)=>{
    const file=e.target.files[0];
    if(!file) return;
    preview.src=URL.createObjectURL(file);
    preview.addEventListener("load",()=>{
        document.querySelector(".img-section").classList.add("active");
        document.querySelector(".img-section").style.padding=0;
        height.value=preview.naturalHeight;
        width.value=preview.naturalWidth;
        ratioimg=preview.naturalWidth/preview.naturalHeight;
    })
    console.log(file);
}

width.addEventListener("keyup",()=>{
    const h=ratio.checked ? width.value / ratioimg : height.value;
    height.value=Math.floor(h);
})
height.addEventListener("keyup",()=>{
    const w=ratio.checked ? height.value / ratioimg : width.value;
    width.value=Math.floor(w);
})
const resize=()=>{
    const canvas=document.createElement("canvas");
    const a=document.createElement("a");
    const ctx=canvas.getContext("2d");
    const imgQuality=quality.checked ? 0.7 : 1.0;

    canvas.width=width.value;
    canvas.height=height.value;

    ctx.drawImage(preview,0,0,canvas.width,canvas.height);
    
    a.href=canvas.toDataURL("image/jpeg",imgQuality);
    a.download=new Date().getTime();
    a.click();
}
btn.addEventListener("click",resize);
imginp.addEventListener("change",loadFile);
imgcon.addEventListener("click",()=>{ imginp.click(); })